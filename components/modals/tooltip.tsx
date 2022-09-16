/* eslint-disable react/destructuring-assignment */
import {
  FunctionComponent,
  memo,
  MemoExoticComponent,
  ReactNode,
  SyntheticEvent,
  useState,
} from "react";

import Popup from "reactjs-popup";
import styles from "components/modals/tooltip.module.scss";
import progress_styles from "styles/common/progress.module.scss";

import { prettyPrintDate } from "lib/utils";
import { EventType, PopupPosition } from "reactjs-popup/dist/types";

interface TooltipProps {
  popupClass?: any;
  key?: string;
  description?: string;
  open?: any;
  onOpen?: (event?: SyntheticEvent<Element, Event>) => void;
  arrow?: any;
  trigger?: any;
  delay?: number;
  position?: PopupPosition | PopupPosition[];
  on?: EventType | [EventType];
  theme?: string;
  nested?: boolean;
  children?: any;
  closeOnClick?: boolean;
  shadow?: boolean;
}

const Tooltip = memo((props: TooltipProps) => {

  function Children(close:any){
    return(
      <div
          onClick={() => {
            if (props.closeOnClick) close();
          }}
          className={`${styles.popup_tooltip} ${props.popupClass}`}
        >
          {props.description && (
            <div className={styles.popup_box}>
              <p>{props.description}</p>
            </div>
          )}
          {props.children}
        </div>
    )
  }
  return (
    <Popup
      key={props.key}
      open={props.open}
      onOpen={props.onOpen}
      arrow={props.arrow ? props.arrow : false}
      mouseEnterDelay={props.delay ? props.delay : 500}
      trigger={() => props.trigger}
      position={props.position ? props.position : "top left"}
      on={props.on ? props.on : ["hover", "focus"]}
      keepTooltipInside={true}
      className={`${props.theme}-cryptostamping-popup cryptostamping-popup ${
        props.shadow ? "shadowed" : ""
      } ${props.arrow ? "arrowed" : ""}`}
      nested={false || props.nested}
    >
      {Children}
    </Popup>
  );
});
Tooltip.displayName = "popup-tooltip";

export default Tooltip;
