import React from 'react';

const DayPhotoCard = () => {
  return (
  <div className="Daycardphoto">
    <div className="container">
      <div className="card">
        <img
          src="tem.jpg"
          alt="Image"
          style={{ maxWidth: '100%', display: 'block', margin: '0 auto' }}
        />
         <div class="text-overlay">真正的英雄不是改变世界，而是改变自己生活的每一天</div>
        </div>
      <div className="divider">
                      <h2>日常反思</h2>
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