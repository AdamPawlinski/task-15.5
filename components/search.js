Search = React.createClass({
  getInitialState() {
      return {
        searchingTerm: ''
      }
  },
  handleChange: function(event) {
    var searchingText = event.target.value;
    this.setState({
      searchingText: searchingText
    });
    if (searchingText.lenght > 2) {
      this.props.onSearch(searchingText);
    }
  },

  handleKeyUp: function(event) {
    if (event.keyCode === 13) {
      this.props.onSearch(this.state.searchingText);
    }
  },

  render: function() {
    var styles = {
      fontSize: '1.5em',
      width: '90%',
      maxWidth: '400px'
    };

    return <input
            type='text'
            onChange={this.handleChange}
            onKeyUp={this.handleKeyUp}
            placeholder="what are you looking for?"
            style={styles}
            value={this.state.searchTerm}
            />
  }
})
