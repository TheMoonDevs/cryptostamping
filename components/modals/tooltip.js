/* eslint-disable react/destructuring-assignment */
import { memo, useState } from "react";

import Popup from "reactjs-popup";
import styles from "components/modals/tooltip.module.scss";
import progress_styles from "styles/common/progress.module.scss";

import { prettyPrintDate } from "lib/utils";

// eslint-disable-next-line react/display-name
const Tooltip = memo((props) => {
  const [description, setDescription] = useState(props.description);
  
  return (
    <Popup
      key={props.key}
      open={props.open}
      arrow={false}
      mouseEnterDelay={props.delay ? props.delay : 500}
      trigger={() => props.trigger}
      position={props.position ? props.position : "top left"}
      on={props.on ? props.on : ["hover", "focus"]}
    >
      {(close) => (
        <div className={styles.popup_tooltip}>
          <div className={styles.popup_box}>
            <p>{description}</p>
          </div>
          {props.children}
        </div>
      )}
    </Popup>
  );
});

export default Tooltip;
