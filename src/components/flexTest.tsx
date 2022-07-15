export default function FlexTest() {
  return (
    <div style={{ display: "flex", gap: 5, flexWrap: "wrap", fontSize: "12px" }}>
      <span style={{ background: "red" }}>Column 1: Timestamp</span>
      <span style={{ background: "blue" }}>Column 2: LOG Level</span>
      <span style={{ background: "yellow" }}>Column 3: SESSINO_ID-SESSION_ID-SESSION_ID</span>
      <span style={{ background: "green" }}>Column 4: MSG long text message with lots of words and lots of things to show and expand and watch</span>
      {/* <span>Column 5</span> */}
    </div>
  )
}
