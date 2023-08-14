import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export default class News extends Component {
  
  capitalize = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
     //Here we can set states
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    document.title = `${this.capitalize(this.props.category)} - NewsMonkey`
  }

  async componentDidMount() {
    this.setState({loading:true})
    this.props.setProgress(10)
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=39863117fb6e4f4caa1bfec682ba75d8&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading : false
    });
    this.props.setProgress(100)
  }
  handleNextClick = async () => {
    this.props.setProgress(10)
    if (this.state.page + 1 > Math.ceil(this.state.totalResults /this.props.pageSize)) {
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=39863117fb6e4f4caa1bfec682ba75d8&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      this.setState({loading:true})
      let data = await fetch(url);
      let parsedData = await data.json();

      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false 
      });
      this.props.setProgress(100)
    }
  };
  handlePrevClick = async () => {
    if(this.state.page<=1){

    }else{

      this.props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=39863117fb6e4f4caa1bfec682ba75d8&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading : false
    });
    this.props.setProgress(100)
}
  };

  static propTypes = {
    category : PropTypes.string,
    pageSize : PropTypes.number,
    country : PropTypes.string
  }

  static defaultProps = {
    category : "general",
    pageSize: 8 ,
    country : "in"
  }


  render() {
    return (
      <>
        <div className="container my-3">
          <h1 className="text-center " style={{marginTop:"100px",marginBottom:"10px"}} >News Monkey - Top  {this.capitalize(this.props.category)} Headlines </h1>
          {this.state.loading && <Spinner />} 
          <div className="row ">
            {!this.state.loading && this.state.articles && this.state.articles.map((element) => {
              return (
                <div className="col-md-4 p-3 " key={element.url}>
                  <NewsItems
                  key={element.url}
                    title={element.title ? element.title.slice(0, 38) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 95)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
          <div className="container d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              type="button"
              className="btn btn-dark "
              onClick={this.handlePrevClick}
            >
              &larr; Previous
            </button>
            <button
              disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
              type="button"
              className="btn btn-dark "
              onClick={this.handleNextClick}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </>
    );
  }
}
