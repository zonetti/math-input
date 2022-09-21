const React = require('react');
const ReactDOM = require("react-dom");

const { View } = require('../fake-react-native-web');
const { components } = require('../index');

const { Keypad, KeypadInput } = components;

class App extends React.Component {
    state = {
        keypadElement: null,
        value: "",
    };

    componentDidMount() {
        this.props.callbacks.value = (newVal) => {
            if (newVal) {
                this.setState({ value: newVal });
            } else {
                return this.state.value;
            }
        };
        this.props.callbacks.blur = () => {
            this.keypadInput.blur();
        };
    }

    onChange = (value, cb) => {
        //this.setState({ value }, cb);
        if (this.props.onChange) {
            this.props.onChange(value);
        }
    };

    focus = () => {
        this.keypadInput.focus(true);
    }

    render() {
        return <View>
            <div
                style={{
                    marginTop: 10,
                    marginLeft: 20,
                    marginRight: 20,
                    marginBottom: 15,
                }}
            >
                <KeypadInput
                    value={this.props.value}
                    keypadElement={this.state.keypadElement}
                    onChange={this.onChange}
                    onFocus={() => this.state.keypadElement.activate()}
                    onBlur={() => this.state.keypadElement.dismiss()}
                    ref={(element) => this.keypadInput = element}
                />
            </div>
            {ReactDOM.createPortal(
              <Keypad
                onElementMounted={(node) => {
                  if (node && !this.state.keypadElement) {
                    this.setState({ keypadElement: node });
                  }
                }}
              />,
              document.body
            )}
        </View>;
    }
}

module.exports = App;