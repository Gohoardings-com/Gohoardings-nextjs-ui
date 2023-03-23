const { default: next } = require('next');
const passport = require('passport');
const bcrypt = require('bcryptjs')
const { executeQuery } = require('../conn/conn');
const { token } = require('../middelware/token');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

passport.use(new LinkedInStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: process.env.callBackUrl,
    scope: ["r_emailaddress", "r_liteprofile"],

}, async (
    accessToken,
    refreshToken,
    profile,
    done
) => {
    process.nextTick(async () => {
        try {
            const userEmail = profile.emails.map((el) => el.value)
            const email = userEmail[0];
            const selectResult = await executeQuery("SELECT * FROM tblcontacts WHERE email='" + email + "'", "gohoardi_crmapp", next)
            if (selectResult.length == 0) {
                const result = await executeQuery("SELECT userid From tblcontacts ORDER By userid DESC LIMIT 1", "gohoardi_crmapp", next)
                if (result) {
                    const userid = JSON.stringify((result[0].userid) + 1)
                    const password = bcrypt.hashSync(profile.id, 8)
                    const insertData = await executeQuery(`Insert into tblcontacts (firstname, email, password, userid, profile_image, provider) VALUES ('${profile.displayName}','${email}','${password}','${userid}','${profile.photos}','${profile.provider}')`, "gohoardi_crmapp", next)
                    if (insertData) {
                        const sql = await executeQuery("Insert into tblclients (userid) values (" + userid + ")", "gohoardi_crmapp", next)
                        if (sql) {
                            return done(null, profile);
                            //     res.setHeader("Set-Cookie",cookie.serialize(String(userid),{expires: Date.now()}))
                            //    token(userid, 200, res)
                        }
                    }

                }
            } else {
                const userid = selectResult[0].userid
                console.log("hii");
                return done(null, profile);
                // res.setHeader("Set-Cookie",cookie.serialize(String(userid),{expires: Date.now()}))
                // token(userid, 200, res)
            }
            return done(null, profile);
        } catch {
        }
    });

}
));