import * as React from "react"
const SvgComponent = (props) => (
  <div className="bg-dark w-100 h-100" style={{paddingTop: "20%"}}>

  <svg
    className="bg-white"
    xmlns="http://www.w3.org/2000/svg"
    width={200}
    height={200}
    preserveAspectRatio="xMidYMid"
    style={{
      margin: "auto",
      // marginTop: "20%",
      borderRadius: "50%",
      background: "#f1f2f3",
      display: "block",
      shapeRendering: "auto",
    }}
    viewBox="0 0 100 100"
    {...props}
  >
    <circle cx={28} cy={75} r={11} fill="#2598a4">
      <animate
        attributeName="fill-opacity"
        begin="0s"
        dur="1s"
        keyTimes="0;0.2;1"
        repeatCount="indefinite"
        values="0;1;1"
      />
    </circle>
    <path
      fill="none"
      stroke="#2a98c1"
      strokeWidth={10}
      d="M28 47a28 28 0 0 1 28 28"
    >
      <animate
        attributeName="stroke-opacity"
        begin="0.1s"
        dur="1s"
        keyTimes="0;0.2;1"
        repeatCount="indefinite"
        values="0;1;1"
      />
    </path>
    <path
      fill="none"
      stroke="#0ef"
      strokeWidth={10}
      d="M28 25a50 50 0 0 1 50 50"
    >
      <animate
        attributeName="stroke-opacity"
        begin="0.2s"
        dur="1s"
        keyTimes="0;0.2;1"
        repeatCount="indefinite"
        values="0;1;1"
      />
    </path>
  </svg>
  </div>

)
export default SvgComponent
