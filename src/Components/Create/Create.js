import React, { Fragment, useContext, useEffect, useState } from 'react';
import './Create.css';
import LeftArrow from '../../assets/LeftArrow'
import OlxLogo from '../../assets/OlxLogo'
import { AuthContext, FirebaseContext } from '../../store/Context';
import { useHistory } from 'react-router';
import { Category_Context } from '../../store/CategoryContext';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import NumberFormat from 'react-number-format';

const Create = () => {

  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const { category } = useContext(Category_Context)

  const [brand, setBrand] = useState('');
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('');
  const [image, setImage] = useState([]);

  const [NumberOfProducts, setNumberOfProducts] = useState()

  // const [imgUrl, setImgUrl] = useState([]);
  var URLS = [];

  const history = useHistory();

  const date = new Date()

  const uploadImage = () => {
    image.map((img, index) => {
      const uploadTask = firebase.storage().ref(`/images/${img.name}`).put(img);
      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log(progress);
          // setProgress(progress);
        },
        error => {
          console.log(error);
        },
        () => {
          firebase.storage()
            .ref("images")
            .child(img.name)
            .getDownloadURL()
            .then(url => {
              URLS = [...URLS, url]
              console.log(URLS);
            })
        }
      );
    })
  }

  useEffect(() => {
    firebase.firestore().collection('products').get().then((snapshot) => {
        snapshot.docs.map((product, key) => {
          return (
            setNumberOfProducts(key+1)
        )
        })
    })
}, [])

  const handleSubmit = () => {
    uploadImage();
    setTimeout(()=>{
      upload();
    }, 5000)
  }

  const upload = () => {
    firebase.firestore().collection("products").add({
      userId: user.uid,
      brand,
      title,
      description,
      category: category.category,
      price,
      url: URLS,
      createdAt: date.toDateString(),
      no:NumberOfProducts? NumberOfProducts+1 : 1
  }).then(()=>{
    history.push('/')
  })
  }

  console.log(NumberOfProducts);

  return (
    <Fragment>
      <header>
        <Link to='/'>
          <div className="brandName">
            <div className="arrow">
              <LeftArrow></LeftArrow>
            </div>
            <div className="logo">
              <OlxLogo></OlxLogo>
            </div>
          </div>
        </Link>
      </header>
      <div className="create">
        <h2>POST YOUR AD</h2>
        <div className="create_parentDiv mx-auto">
          <div className="create_firtDiv">
            <h3>SELECTED CATEGORY</h3>
            <div className="create_path">
              <p>{category.path} <Link to="/create">Change</Link></p>
              {/* <p>cars / cars <Link to="/create">Change</Link></p> */}
            </div>
            <hr />
          </div>

          <div className="create_details mx-auto">
            <h3>INCLUDE SOME DETAILS</h3>

            <div className="fields">
              <div className="field">
                <label htmlFor="brand">
                  Brand *
                </label>
                <input
                  type="text"
                  name=""

                  id="brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="year">
                  Year *
                </label>
                <input
                  type="number"
                  name=""
                  id="year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="title">
                  Ad Title *
                </label>
                <input
                  type="text"
                  name=""
                  id="title"
                  maxLength="70"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <div className="p">
                  <p>Mention the key features of your item (e.g. brand, model, age, type)</p>
                  <p><span>{title.length} / 70</span></p>
                </div>
              </div>

              <div className="field-textarea">
                <label htmlFor="">
                  Description *
                </label>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="4"
                  maxLength="4096"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <div className="p">
                  <p>Include condition, features and reason for selling</p>
                  <p><span>{description.length} / 4096</span></p>
                </div>
              </div>
            </div>

            <hr />

            <div className="set-price">
              <h3>SET A PRICE</h3>
              <div className="field">
                <label htmlFor="">Price *</label>
                <NumberFormat
                  thousandSeparator={true}
                  className="foo"
                  thousandsGroupStyle="lakh"
                  prefix={'₹'}
                  value={price}
                  onValueChange={(value, name) => setPrice(value.value)} />
              </div>
            </div>

            <hr />

            <div className="upload-photos">
              <h3>UPLOAD PHOTOS</h3>

              <div className="pictures row ml-0">
                <input
                  type="file"
                  name=""
                  id="pic-1"
                  accept="image/*"
                  onChange={(e) => setImage([...image, e.target.files[0]])}
                  hidden />
                <input
                  type="file"
                  name=""
                  id="pic-2"
                  accept="image/*"
                  onChange={(e) => setImage([...image, e.target.files[0]])}
                  hidden />
                <input
                  type="file"
                  name=""
                  id="pic-3"
                  accept="image/*"
                  onChange={(e) => setImage([...image, e.target.files[0]])}
                  hidden />
                <input
                  type="file"
                  name=""
                  id="pic-4"
                  accept="image/*"
                  onChange={(e) => setImage([...image, e.target.files[0]])}
                  hidden />
                <input
                  type="file"
                  name=""
                  id="pic-5"
                  accept="image/*"
                  onChange={(e) => setImage([...image, e.target.files[0]])}
                  hidden />

                <label htmlFor="pic-1" className="parent-picture active p-0 col-2">
                  {image[0] && <img src={image[0] ? URL.createObjectURL(image[0]) : ''} alt="" />}
                  <div className={!image[0] && "add"}>
                    {!image[0] && <i class="fas fa-camera mx-auto active"></i>}
                    {!image[0] && <p className="add-photo-btn">Add photo</p>}
                  </div>
                </label>

                <label htmlFor={image[0] && "pic-2"} className={`parent-picture col-2 ${image[0] && "active"}`}>
                  {image[1] && <img src={image[1] ? URL.createObjectURL(image[1]) : ''} alt="" />}
                  <div className={!image[1] && "add"}>
                    {!image[1] && <i class={`fas fa-camera mx-auto ${image[0] && "active"}`}></i>}
                    {!image[1] && <p className="add-photo-btn">Add photo</p>}
                  </div>
                </label>

                <label htmlFor={image[1] && "pic-3"} className={`parent-picture col-2 ${image[1] && "active"}`}>
                  {image[2] && <img src={image[2] ? URL.createObjectURL(image[2]) : ''} alt="" />}
                  <div className={!image[2] && "add"}>
                    {!image[2] && <i class={`fas fa-camera mx-auto ${image[1] && "active"}`}></i>}
                    {!image[2] && <p className="add-photo-btn">Add photo</p>}
                  </div>
                </label>

                <label htmlFor={image[2] && "pic-4"} className={`parent-picture col-2 ${image[2] && "active"}`}>
                  {image[3] && <img src={image[3] ? URL.createObjectURL(image[3]) : ''} alt="" />}
                  <div className={!image[3] && "add"}>
                    {!image[3] && <i class={`fas fa-camera mx-auto ${image[2] && "active"}`}></i>}
                    {!image[3] && <p className="add-photo-btn">Add photo</p>}
                  </div>
                </label>

                <label htmlFor={image[3] && "pic-5"} className={`parent-picture col-2 ${image[3] && "active"}`}>
                  {image[4] && <img src={image[4] ? URL.createObjectURL(image[4]) : ''} alt="" />}
                  <div className={!image[4] && "add"}>
                    {!image[4] && <i class={`fas fa-camera mx-auto ${image[3] && "active"}`}></i>}
                    {!image[4] && <p className="add-photo-btn">Add photo</p>}
                  </div>
                </label>
              </div>
            </div>

            <hr />

            <div className="post-btn">
              <button onClick={handleSubmit} >Post now</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Create;
