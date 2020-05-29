import React, { useEffect } from 'react';
import './Profile.css';
import { connect } from 'react-redux';
import {
  OPEN_MODAL_WINDOW,
  CANCEL_MODAL_WINDOW,
  UPDATE_PROFILE,
  fetchProfile
} from '../../store/actions';
import Modal from './Modal';
import Name from './profileFields/Name';
import Phone from './profileFields/Phone';
import Email from './profileFields/Email';
import Balance from './profileFields/Balance';
import RedactFields from './profileFields/RedactFields';
import { scenesEnum } from '../../constants';
import ShowNotification from '../ShowNotification';

function Profile({
  isOpenModal,
  balance,
  email,
  phone,
  name,
  titleModal,
  typeModal,
  openModal,
  imagePath,
  handleCancel,
  updateProfile,
  fetchProfileUser,
  notifications,
  isLoggedIn,
  profile
})
 {

  useEffect(() => {
    fetchProfileUser(profile.id);
  }, []);

  if (isLoggedIn) {
    return (
      <>
        <div className="profile">
          <div className="profile-header">
            <b>My profile</b>
          </div>

          <div style={{ float: 'left' }}>
            <Name name={name} />
            <Phone phone={phone} />
            <Email email={email} />
            <Balance balance={balance} />
          </div>

          <RedactFields openModal={openModal} />
        </div>

        <Modal
          title={titleModal}
          typeModal={typeModal}
          isOpenModal={isOpenModal}
          onCancel={handleCancel}
          onSubmit={updateProfile}
          profile={profile}
        />

        <ShowNotification notifications={notifications} currentScene={scenesEnum.PROFILE} />
      </>
    );
  }

  return null;
}

const mapStateToProps = ({
  profile: { isOpenModal, balance, email, phone, name, imagePath, titleModal, typeModal },
  authorization: { isLoggedIn, userId },
  notifications,
  profile
}) => ({
  isOpenModal,
  imagePath,
  balance,
  email,
  phone,
  name,
  titleModal,
  typeModal,
  isLoggedIn,
  userId,
  notifications,
  profile
});

const mapDispatchToProps = dispatch => ({
  openModal: ({ type, title }) => dispatch(OPEN_MODAL_WINDOW(type, title)),
  handleCancel: () => dispatch(CANCEL_MODAL_WINDOW()),
  updateProfile: (data, alertText, typeModal, profile) =>
    UPDATE_PROFILE(data, alertText, typeModal, profile, dispatch),
  fetchProfileUser: (userId) => fetchProfile(userId, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
