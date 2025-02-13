import paw from '../assets/paw.png';

export default function Card({ id, url, name, handleClick, rotate }) {
  return (
    <div
      onClick={() => handleClick(id)}
      className={`card ${rotate ? 'rotate' : ''}`}>
      <div className="front-card">
        <img src={url} className="cat-img" />
        <p className="name">{name}</p>
      </div>
      <div className="back-card">
        <img src={paw} alt="Cats paw" />
      </div>
    </div>
  );
}
