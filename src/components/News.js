import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps ={
    country: 'in',
    pageSize:8,
    category:'geneal'
  }

  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page:1,
      totalResults:0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsHub`;
  }
  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6eec8a7b407441aa889caf99fc55f638&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false, 
    })

}
  
  // 3c1cceed47044b0b810bd1c3e8a290d1
 async componentDidMount(){
 
//  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3c1cceed47044b0b810bd1c3e8a290d1&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
//  this.setState({loading:true});
//  let data= await fetch(url);
//  let parsedData= await data.json()
//  console.log(parsedData);
//  this.setState(
 // {
  // articles:parsedData.articles,totalResults:parsedData.totalResults,
  // loading:false

  this.updateNews();
}
//)
 
 // }

  handlePrevClick=async()=>{
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&categery=${this.props.category}&apikey=3c1cceed47044b0b810bd1c3e8a290d1&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
//     this.setState({loading:true});
//  let data= await fetch(url);
//  let parsedData= await data.json()
//  console.log(parsedData);
 
    this.setState(
      {page:this.state.page-1});
      
      this.updateNews();
      // articles:parsedData.articles,
      // loading:false
    
  }
  handleNextClick=async()=>{
//     if (this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

//     }else{
//   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&categery=${this.props.category}&apikey=3c1cceed47044b0b810bd1c3e8a290d1&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
//   this.setState({loading:true});
//  let data= await fetch(url);
//  let parsedData= await data.json()
 
//  console.log(parsedData);
 
    this.setState({page:this.state.page+1});
    this.updateNews();
      // articles:parsedData.articles,
      // loading:false

    
  }
  //}
  fetchMoreData = async () => {  
    this.setState({page: this.state.page + 1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&categery=${this.props.category}&apikey=6eec8a7b407441aa889caf99fc55f638&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults
    })
  };
  render() {
    //console.log("render")
    // let { title, description, urlToImage, newsurl } = this.props;
    return (
      <>
        <h2 className='text-center' style={{margin:'33px 0px'}}>News Hub Keeps you ahead - HeadLines </h2>
       
       
         {this.state.loading && <Spinner/>} 
   
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
          >
      <div className="container">      
        <div className="row">
          {
          // !this.state.loading && 
          this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 88):""} imageurl={element.urlToImage} newsurl={element.url} />
            </div>

          })}
          
        </div>
        </div>
        </InfiniteScroll>
        </>
      //    <div className="container d-flex justify-content-between">
      //   <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr;Previous</button>
      //   <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" class="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

      //   </div> 
      //  </div>
    )
  }
}

export default News
