import React, { Component } from 'react';
import Post from '../../components/Post/Post';

class HomePage extends Component {
  render() {
    return (
      <main className='homepage'>
        <div className='container'>
          <div>
            <Post
              userName='huubinh49'
              userAvatar='https://res.cloudinary.com/daten/image/upload/v1650819174/avatar_mlwjsm.jpg'
              status='Lorem qwe qwe qwe qwe qw eq weq we qwe qwe q we qwe q we qw e qwe qw e'
              createdAt='14:30pm'
              images={[
                'https://techkalzen.com/wp-content/uploads/2020/02/tron-bo-nhung-hinh-anh-dep-buon-mang-tam-trang-suy-tu-1.jpg',
                'https://techkalzen.com/wp-content/uploads/2020/02/tron-bo-nhung-hinh-anh-dep-buon-mang-tam-trang-suy-tu-3.jpg',
              ]}
              position='FE Developer'
            />
          </div>
        </div>
      </main>
    );
  }
}

export default React.memo(HomePage);
