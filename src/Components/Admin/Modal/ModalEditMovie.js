import * as action from "../../../Store/action";
import { connect } from "react-redux";
import React, { Component } from "react";
import moment from "moment";
class ModalEditMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maPhim: "",
      tenPhim: "",
      biDanh: "",
      ngayKhoiChieu: "",
      hinhAnh: "",
      danhGia: "",
      trailer:"",
      moTa:"",
      maNhom: "GP01",
      file:null
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps){
    if(nextProps.idPhim !==""){
      let movie = nextProps.movie
      this.setState({
        maPhim: movie.maPhim,
        tenPhim: movie.tenPhim,
        biDanh:movie.biDanh,
        ngayKhoiChieu:movie.ngayKhoiChieu,
        hinhAnh:movie.hinhAnh,
        danhGia:movie.danhGia,
        trailer:movie.trailer,
        moTa:movie.moTa
      })
    }
  }
  handleImage(e){
    let file= e.target.files[0]
    this.setState({
      file,
    });
  }
  handleClose = e => {
    this.props.getMovieList()
  };
  handleChangeEdit = e => {
    let { name, value } = e.target;
      this.setState({
        [name]: value,
      });
  };
  handleSubmitEdit = async e => {
    e.preventDefault();
    let ngayKhoiChieu = moment.utc(this.state.ngayKhoiChieu).format("DD/MM/YYYY")
    let movie = {...this.state,ngayKhoiChieu}
    let File = this.state.file
    let formData = new FormData()
    formData.append('File',File)
    formData.append('tenphim',this.state.tenPhim)
    formData.append('manhom','GP01')
    this.props.updateMovie(movie,formData)
    return (this.state.file)? (this.props.addImageMovie(formData)):null
  };
 render() {
  let detailMovie= this.state
    return (
      <div id="myModal" className="modal fade" data-backdrop="static" data-keyboard="false" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content editMovie">
            <div className="modal-body">
              <form
                onSubmit={this.handleSubmitEdit}
                encType="multipart/form-data"
                action="/upload/image"
              >
                <div className="form-group">
                  <label>M?? Phim:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="maPhim"
                    value={detailMovie.maPhim || ""}
                    onChange={this.handleChangeEdit}
                    placeholder="Nh???p M?? Phim"
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>T??n Phim:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="tenPhim"
                    onChange={this.handleChangeEdit}
                    value={detailMovie.tenPhim || ""}
                    placeholder="Nh???p T??n Phim"
                  />
                </div>
                <div className="form-group">
                  <label>B?? Danh:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="biDanh"
                    value={detailMovie.biDanh || ""}
                    onChange={this.handleChangeEdit}
                    placeholder="Nh???p B?? Danh Phim"
                  />
                </div>
                <div className="form-group">
                  <label>Trailer:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="trailer"
                    value={detailMovie.trailer || ""}
                    onChange={this.handleChangeEdit}
                    placeholder="Nh???p ???????ng d???n trailer Youtube"
                  />
                </div>
                <div className="form-group">
                  <label>Ng??y Kh???i Chi???u:</label>
                  <input
                    type="date"
                    className="datePicker"
                    onChange={this.handleChangeEdit}
                    value={moment.utc(detailMovie.ngayKhoiChieu).format("YYYY-MM-DD")|| ""}
                    name="ngayKhoiChieu"
           
                  />
                </div>
                <div className="form-group">
                  <label>M?? T???:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="moTa"
                    value={
                     detailMovie.moTa || ""
                    }
                    onChange={this.handleChangeEdit}
                    placeholder="Nh???p ????nh gi?? t??? 1 ?????n 5"
                  />
                </div>
                <div className="form-group">
                  <label>H??nh ???nh:</label>
                  <label>(Up ???nh d?????i 1MB)</label>
                  <input
                    type="file"
                    className="form-control"
                    name="hinhAnh"
                    accept="image/*"
                    onChange={(e)=>this.handleImage(e)}
                  />
                </div>
                <div className="form-group">
                  <label>????nh Gi??:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="danhGia"
                    value={
                     detailMovie.danhGia || ""
                    }
                    onChange={this.handleChangeEdit}
                    placeholder="Nh???p ????nh gi?? t??? 1 ?????n 5"
                  />
                </div>
                <button type="submit" className="btn btn-update btn-success">
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                  onClick={this.handleClose}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movie: state.movieReducer.movie,
    checkedSucessMovie: state.movieReducer.checkedSucessMovie
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getMovieList:() => {
      dispatch(action.actGetListMovieAPI());
    },
    updateMovie: tk => {
      dispatch(action.actUpdateMovie(tk));
    },
    addImageMovie: image => {
      dispatch(action.actthemHinhAnhPhim(image));
    },
    checkedSuccess: ()=>{
      dispatch(action.actUploadMovieSuccess())
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalEditMovie);
