import Fixednavbar from "@/components/navbar/fixednavbar";
import { CityNameImage } from "../allApi/apis";
import Link from "next/link";
import styles from "../styles/404.module.scss";
import Image from "next/image";

const ErrorPage = () => {
  return (
    <div className={`${styles.media_branding_n} text-center`}>
      <Fixednavbar />
      <div className="d-hide drop-nd"></div>
      {/* <Branding title="You've found a page that does'nt exist" /> */}
      <div className="mt-5 pt-5">
        <Image
          src="/images/all_image/404.png"
          alt="404 img"
          width={180}
          height={120}
        />
        <h2 className="mt-2"> You've found a page that does'nt exist </h2>
      </div>
      <div
        className={`${styles.grid_containerN} container-xxl  container-xl text-center container-lg container-md my-5 p`}
      >
        {CityNameImage.map((pos, index) => {
          return (
            <Link href={`/${pos.value}/delhi`} className="text-decoration-none">
              <div className={styles.container} key={index}>
                <div className={styles.card1}>
                  <div className={styles.logo_img}>{pos.icon}</div>

                  <h3>{pos.label}</h3>
                  <div className={styles.go_corner}>
                    <div className={styles.go_arrow}>→</div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ErrorPage;