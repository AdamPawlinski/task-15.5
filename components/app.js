var GIPHY_API_URL = 'http://api.giphy.com';
var GIPHY_PUB_KEY = 'dc6zaTOxFJmzC';

App = React.createClass({
  getInitialState() {
    return {
      loading: false,
      searchingText: '',
      gif: {}
    }
  },

  handleSearch: function(searchingText) {
    this.setState({
      loading: true
    });
    this.getGif(searchingText, function(gif) {
      this.setState({
        loading: false,
        gif: gif,
        searchingText: searchingText
      });
    }.bind(this));
  },

  getGif: function(searchingText, callback) {
    return new Promise(
      function (resolve, reject) {
        var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function() {
          if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText).data;
            var gif = {
              url: data.fixed_width_downsampled_url,
              sourceUrl: data.url
            };
            resolve(this.callback(gif));
          } else {
            reject(new Error(
              `Error on request: ${this.statusText}`
            ));
          }
        }
        xhr.onerror = function () {
          reject(new Error(
            `No connection error: ${this.statusText}`
          ))
        }
        xhr.send();
      }
    );
  },

  getGif()
  .then(response => callback(gif))
  .catch(error => console.error(`Looks like sth went wrong: ${this.statusText}`)),

  render: function() {
    var styles = {
      margin: '0 auto',
      textAlign: 'center',
      width: '90%'
    };

    return (
      <div style={styles}>
          <h1>GIF search</h1>
          <p>Find GIF on <a href="http://giphy.com">giphy</a>. Click to download next GIF.</p>
          <Search onSearch={this.handleSearch}/>
        <Gif
          loading={this.state.loading}
          url={this.state.gif.url}
          sourceUrl={this.state.gif.sourceUrl}
        />
      </div>
    );
  }
})
