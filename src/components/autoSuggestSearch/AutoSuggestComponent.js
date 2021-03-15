import React, {Component} from 'react';
import AuthenticationService from "../../api/authenticationservice/AuthenticationService";
import Autosuggest from 'react-autosuggest';
import Dataservice from "../../api/dataservice/Dataservice";

class AutoSuggestComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            suggestions: []
        }
    }

    onChange = (event, {newValue}) => {
        this.setState({
            value: newValue
        });
        this.props.recipient(newValue)
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({value}) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    componentDidMount() {
        Dataservice.getUsers().then(response => {
            usernames = response.data
        })
    }

    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        const {value, suggestions} = this.state;
        const inputProps = {
            placeholder: 'Search for a user',
            value,
            onChange: this.onChange
        };
        return (
            <div>
                <Autosuggest
                    style={{position: 'relative'}}
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                />
            </div>
        );
    }
}

export default AutoSuggestComponent
let usernames = [];

const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : usernames.filter(name =>
        name.toLowerCase().slice(0, inputLength) === inputValue
    );
};

const getSuggestionValue = suggestion => suggestion;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <span>{suggestion}</span>
);