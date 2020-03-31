import * as firebase from "firebase";
import C from "../../tools/Constants";

export const updateProfile = (email, displayName, phoneNumber) => dispatch => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
        email: email,
        phoneNumber: phoneNumber,
        displayName: displayName
    })
        .then(function(userRecord) {
            // See the UserRecord reference doc for the contents of userRecord.
            dispatch({
                type: C.SUCCESS_UPDATE_PROFILE,
                message: 'Successfully updated user'
            });
        })
        .catch(function(error) {
            dispatch({
                type: C.ERROR_UPDATE_PROFILE,
                payload: 'Error updating user:', error
            });
        });
};