import React, { Component } from 'react';

class SearchFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  preventSubmit(event) {
    event.preventDefault();
  }

  filterData(text, sourceArray) {
    const filteredData = sourceArray.filter((element) =>
      element.title.toLowerCase().includes(text.toLowerCase())
    );
    return filteredData;
  }

  updateInputValue(event) {
    const newValue = event.target.value;
    this.setState(
      {
        inputValue: newValue,
      },
      () => {
        const filteredData = this.filterData(newValue, this.props.source);
        this.props.updateData(filteredData);
      }
    );
  }

  sendQuery() {
    console.log('Sending query...');
  }

  render() {
    return (
      <form className='search-form' onSubmit={(event) => this.preventSubmit(event)}>
        <div>
          <label>Search for:</label>
        </div>
        <div>
          <input
            type="text"
            onChange={(event) => this.updateInputValue(event)}
            value={this.state.inputValue}
          />
        </div>
        <button onClick={() => this.sendQuery()}>Send Query</button>
      </form>
    );
  }
}

export default SearchFilter;
