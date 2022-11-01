const PropTypes = require("prop-types");
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
        <g clipPath="url(#clip0_337_578)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 1.25C0 0.559643 0.559645 0 1.25 0H10.75C11.4404 0 12 0.559645 12 1.25V14.75C12 15.4404 11.4404 16 10.75 16H1.25C0.559643 16 0 15.4404 0 14.75V1.25ZM2 2V14H10V2H2Z"
            fill={this.props.color}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14 13.25C14 12.5596 14.5596 12 15.25 12H20.75C21.4404 12 22 12.5596 22 13.25V18.75C22 19.4404 21.4404 20 20.75 20H15.25C14.5596 20 14 19.4404 14 18.75V13.25ZM16 14V18H20V14H16Z"
            fill={this.props.color}
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
