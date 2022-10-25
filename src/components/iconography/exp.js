const PropTypes = require("prop-types");
const React = require("react");

class Exp extends React.Component {
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
        <g clip-path="url(#clip0_337_389)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 5.25C0 4.55964 0.559645 4 1.25 4H10.75C11.4404 4 12 4.55965 12 5.25V18.75C12 19.4404 11.4404 20 10.75 20H1.25C0.559643 20 0 19.4404 0 18.75V5.25ZM2 6V18H10V6H2Z"
            fill={this.props.color}
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14 1.25C14 0.559645 14.5596 0 15.25 0H20.75C21.4404 0 22 0.559644 22 1.25V6.75C22 7.44036 21.4404 8 20.75 8H15.25C14.5596 8 14 7.44036 14 6.75V1.25ZM16 2V6H20V2H16Z"
            fill={this.props.color}
          />
        </g>
        <defs>
          <clipPath id="clip0_337_389">
            <rect width="22" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  }
}

module.exports = Exp;
