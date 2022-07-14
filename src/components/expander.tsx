import { useEffect, useState } from "react";
import { createPrefixGroup, loggingGroupProps } from "../loggingPrefixes";

const prefix = ["Expander", "#224455"];
const p = createPrefixGroup(prefix) as loggingGroupProps;

interface Props {
  state: string;
  // stateObject?: {};
}

const objectSummaryMaxLength = 6;

export default function Expander(props: Props) {
  const [expand, setExpand] = useState<boolean>(false);

  const [type, setType] = useState<string>("");

  const [localState, setLocalState] = useState<any[]>([]);

  useEffect(() => {
    console.log(...p.p, "mounted");
  }, []);
  useEffect(() => {
    if (props.state) {
      const value = JSON.parse(props.state);
      console.log(...p.p, "we have state", value);

      if (Array.isArray(value)) {
        setType("array");
        for (let i = 0; i < value.length; i++) {
          if (Array.isArray(value[i])) {
          } else if (typeof value[i] === "object") {
            // value[i] = JSON.stringify(value[i]);
          }
        }
        setLocalState(value);
      } else if (typeof value === "object") {
        setType("object");
        const entries = Object.entries(value);

        for (let i = 0; i < entries.length; i++) {
          // entries[i][0]
          if (typeof entries[i][1] === "object") {
            // entries[i][1] = JSON.stringify(entries[i][1]);
          }
        }
        console.log(...p.pU, "entries:", Object.entries(value), value);
        setLocalState(entries);
      }

      // if (props.state)
    }

    // if (props.stateArray) setType("array");
    // else if (props.stateObject) {
    //   console.log("Entries", Object.entries(props.stateObject));
    //   setType("object");
    // }
  }, [props]);

  return (
    <div>
      {/* <div>{props.state}</div> */}
      <div className="clicker" style={{ display: "flex", gap: 3 }} onClick={() => setExpand(!expand)}>
        {!expand ? "➡️" : "⬇️"}
        {type === "array" ? (
          // <span style={{ color: "orange", fontWeight: "bold" }}>Array</span>
          // <span>({localState.length})</span>
          <></>
        ) : type === "object" ? (
          // <span style={{ color: "pink", fontWeight: "bold" }}>Object</span>
          // <span></span>
          <></>
        ) : (
          ""
        )}

        {typeof props.state === "object" ? (
          <></>
        ) : (
          <>
            {type === "object" && (
              <>
                {/* <span style={{ color: "#9AA0A6" }}>{JSON.stringify(props.state).substring(0, 100)}</span> */}
                {localState && (
                  <>
                    <span style={{ color: "#9AA0A6" }}>{"{"}</span>
                    <>
                      {localState.map((e: any, i: number) => (
                        <>
                          {i < objectSummaryMaxLength && (
                            <span style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                              <span style={{ color: "#9AA0A6" }}>{e[0]}:</span>
                              <span>
                                {typeof e[1] === "object" ? (
                                  <span style={{ color: "#9AA0A6" }}>{"{...}"}</span>
                                ) : (
                                  <span style={{ display: "flex", flexDirection: "row" }}>
                                    <span>
                                      {typeof e[1] === "number" && <span style={{ color: "#8980DC" }}>{e[1]}</span>}
                                      {typeof e[1] === "string" && <span style={{ color: "#35D4C7" }}>"{e[1]}"</span>}
                                      {/* <span style={{ color: "#9AA0A6" }}>{e[1]}</span> */}
                                      {i < localState.length - 1 && i < objectSummaryMaxLength && (
                                        <span style={{ color: "#9AA0A6" }}>,</span>
                                      )}

                                      {i >= objectSummaryMaxLength - 1 && <span style={{ paddingLeft: 5 }}>{"..."}</span>}
                                    </span>
                                  </span>
                                )}
                              </span>
                            </span>
                          )}
                        </>
                      ))}
                    </>
                    <span style={{ color: "#9AA0A6" }}>{"}"}</span>
                  </>
                )}
              </>
            )}

            {type === "array" && (
              //{/* <span style={{ color: "#9AA0A6" }}>{props.state.substring(0, 100)}</span> */}
              <>
                {localState && (
                  <>
                    <span>({localState.length})</span>
                    <span style={{ color: "#9AA0A6" }}>[</span>
                    <>
                      {localState.map((e: any, i: number) => (
                        <span style={{ display: "flex" }}>
                          <span style={{ display: "flex", gap: 5 }}>
                            <>{typeof e === "number" && <span style={{ color: "#8980DC" }}>{e}</span>}</>
                            <>{typeof e === "string" && <span style={{ color: "#35D4C7" }}>"{e}"</span>}</>
                            <>{typeof e === "object" && <span style={{ color: "#9AA0A6" }}>{"{...}"}</span>}</>
                          </span>
                          {i < localState.length - 1 && <span style={{ color: "#9AA0A6" }}>,</span>}
                        </span>
                      ))}
                    </>
                    <span style={{ color: "#9AA0A6" }}>]</span>
                    {/* } */}
                  </>
                )}
              </>
            )}
          </>
        )}
        {/* {props.state.length > 100 && " ..."} */}
      </div>
      {expand && (
        <div>
          {localState &&
            localState.length > 0 &&
            localState.map((e: any, i: number) => (
              <div>
                {type === "object" && (
                  <span style={{ display: "flex", flexDirection: "row", gap: 5, paddingLeft: 30 }}>
                    <span style={{ color: "#5DB0CB" }}>{e[0]}:</span>
                    <span style={{ color: "#9AA0A6" }}>
                      {typeof e[1] === "object" ? (
                        <Expander state={JSON.stringify(e[1])} />
                      ) : (
                        <>
                          {typeof e[1] === "number" && <span style={{ color: "#8980DC" }}>{e[1]}</span>}
                          {typeof e[1] === "string" && <span style={{ color: "#35D4C7" }}>"{e[1]}"</span>}
                          {/* <span style={{ color: "#9AA0A6" }}>{e[1]}</span> */}
                        </>
                      )}
                    </span>
                  </span>
                )}
                {type === "array" && (
                  <span style={{ display: "flex", gap: 5, paddingLeft: 30 }}>
                    <span style={{ color: "#4FB0D7" }}>{i}:</span>
                    <>{typeof e === "number" && <span style={{ color: "#8980DC" }}>{e}</span>}</>
                    <>{typeof e === "string" && <span style={{ color: "#35D4C7" }}>"{e}"</span>}</>
                    <>{typeof e === "object" && <Expander state={JSON.stringify(e)} />}</>
                    {/* <span>{e}</span> */}
                  </span>
                )}
              </div>
            ))}
        </div>
      )}
      {/* <div>{props.stateObject && Object.entries(props.stateObject).map((e: any, i: number) => <div>{e}</div>)}</div> */}
    </div>
  );
}
