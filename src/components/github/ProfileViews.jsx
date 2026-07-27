import React from 'react';
import Card from '../common/Card';

const ProfileViews = () => {
  return (
    <div>
      {/* Profile Views */}

      <div className="mt-10">
        <Card className="flex justify-center p-6">
          <img
            src="https://komarev.com/ghpvc/?username=MSabbirHossen&label=Profile%20Views&color=3B82F6&style=for-the-badge"
            alt="Profile Views"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        </Card>
      </div>
    </div>
  );
};

export default ProfileViews;
