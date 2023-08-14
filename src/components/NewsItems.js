import React, { Component } from "react";

export default class NewsItems extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;

    return (
      <div>
        <div className="card ">
        <span style={{zIndex:"1" , left:"90%"}} className="position-absolute top-0  translate-middle badge rounded-pill bg-danger">
    {source}
    
  </span>
          <img
            src={
              !imageUrl
                ? "https://www.hindustantimes.com/ht-img/img/2023/08/12/1600x900/roaddelhi_1691840160341_1691840165323.png"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">

            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {author ? author : "Unknown"} on {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-dark"
              rel="noreferrer"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
