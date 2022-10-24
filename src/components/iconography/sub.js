const PropTypes = require("prop-types");
/**
 * An autogenerated component that renders the EXP iconograpy in SVG.
 *
 * Generated with: https://gist.github.com/crm416/3c7abc88e520eaed72347af240b32590.
 */
const React = require("react");

class Sub extends React.Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
  };

  render() {
    return (
      <svg
        width="22"
        height="20"
        viewBox="0 0 22 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_337_578)">
          <rect width="22" height="20" fill="white" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 2C0 0.895431 0.89543 0 2 0H10C11.1046 0 12 0.89543 12 2V14C12 15.1046 11.1046 16 10 16H2C0.895431 16 0 15.1046 0 14V2ZM10 2L2 2V14H10V2Z"
            fill="#3C3E40"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14 14C14 12.8954 14.8954 12 16 12H20C21.1046 12 22 12.8954 22 14V18C22 19.1046 21.1046 20 20 20H16C14.8954 20 14 19.1046 14 18V14ZM20 14H16V18H20V14Z"
            fill="#3C3E40"
          />
        </g>
        <defs>
          <clipPath id="clip0_337_578">
            <rect width="22" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  }
}

module.exports = Sub;
