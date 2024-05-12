import React ,{ useState }from 'react';

const DayPhotoCard = () => {
 const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activejuIndex, setActivejuIndex] = useState(0);
 const imagePaths = [
    "tem1.jpg",
    "tem2.jpg"
   ];
   const ju=[
   "A true hero is not to change the world, but to change his life every day .",
    "Do you love life ? Then do not squander time ; for that's the stuff life is made of ."
   ]
   const currentImagePath = imagePaths[activeImageIndex];
   const currentju=ju[activejuIndex];
   const switchImage = () => {
       setActiveImageIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
       setActivejuIndex((prevIndex) => (prevIndex + 1) % ju.length);

     };
  return (
  <div className="Daycardphoto">
    <div className="container">
      <div className="card">
        <img
          src={currentImagePath}
          alt="Image"
          style={{ maxWidth: '100%', display: 'block', margin: '0 auto' }}
          onClick={switchImage}
        />
         <div class="text-overlay">{currentju}</div>
        </div>
      <div className="divider">
                      <h2>Daily reflection</h2>
                    </div>
      <div className="divider" />
      <textarea
        style={{ minHeight: '100px', resize: 'vertical' }}
      />
    </div>
    </div>
  );
};

export default DayPhotoCard;