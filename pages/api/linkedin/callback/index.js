
import passport from 'passport';
import '../../../../server/utils/passport'



export default async function (req,res, next){
  passport.authenticate('linkedin', {
  successRedirect: '/',
  failureRedirect: '/testmonials'
  })(req,res, next)
}