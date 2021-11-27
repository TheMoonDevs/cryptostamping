import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useMoralis } from "react-moralis";

import { FRONTEND_BASE_URL } from "lib/data";

import InvestBlock from "components/home/investblock";
import sidebar from "components/modals/sidebar.module.scss";
import styles from "components/modals/trailer.module.scss";

import { DATE_INFO, investFAQs } from "lib/data";
import { setLoggedIn } from "lib/redux/features/userSlice";
import { setSidebarOpen, setTopLoading } from "lib/redux/features/uiSlice";

function TrailerSidebar({}) {
  // const currentUser = Moralis.User.current();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const { Moralis, user } = useMoralis();

  const isTrailerOpen = useSelector((state) => state.ui.isTrailerOpen);

  const hide = () => {
    dispatch(setSidebarOpen({ type: "Trailer", open: false }));
  };

  const points = investFAQs;

  const [displayPoint, setDisplayPoint] = useState("The idea");
  const [highlightBlock, setHighlightBlock] = useState(false);

  return (
    <div id="outside_box" className={`${sidebar.container}`}>
      <div
        className={`${sidebar.sidebar} ${sidebar.fill} ${sidebar.left} ${
          isTrailerOpen && sidebar.active
        }`}
      >
        <div className={styles.container}>
          <div className={styles.video_box}>
            <video
              className={styles.video}
              src={"/videos/site_storm.mp4"}
              controls={false}
              autoPlay={true}
              poster={"/images/blank_background.svg"}
              muted
              loop
              playsInline
            />
            <p className={styles.video_tagline}>{DATE_INFO}</p>
          </div>
          <div className={styles.info_box}>
            <div className={styles.header}>
              <div>
                <h1>Cut Outs</h1>
                {!highlightBlock &&
                <p> The first ever digital stamp collection </p>
                }
                {highlightBlock &&
                  <div onClick={() => {setHighlightBlock(false);}}
                  className={styles.link}>
                    <span className={styles.icon_back} />
                    Go Back.
                  </div>
                }
              </div>
              <div className={sidebar.icon_btn} onClick={hide}>
                <span className={sidebar.close_icon} />
              </div>
            </div>
            {!highlightBlock &&
              <div className={styles.point_list}>
              {points.map((point) => {
                return (
                  <div
                    key={point.question}
                    onClick={() => {
                      setDisplayPoint(point.question);
                    }}
                  >
                    <h3 className={styles.point_question}>
                      <b>{point.question}</b>
                    </h3>
                    <p
                      className={`${styles.point_item} ${
                        displayPoint !== point.question && styles.disactive
                      }`}
                    >
                      {point.answer}
                    </p>
                  </div>
                );
              })}
              </div>
            }
            <InvestBlock highlightBlock={highlightBlock} setHighlightBlock={setHighlightBlock}/>  
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrailerSidebar;

/* {user?.get("username").length > 15
                ? "Random"
                : user?.get("username")}
                */
