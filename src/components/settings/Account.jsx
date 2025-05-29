import { useEffect, useRef, useState } from "react";
import Modal from "../general/Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfiles } from "../../slices/profileSlice";
import { useTranslation } from "react-i18next";
import { registerUser, stopCreatingOrUpdateingUser, updateUser } from "../../slices/userSlice";
import { firstCapitalize } from "../../lib/firstCapitalize";
import { showToast } from "../../slices/appSlice";
import CurrentUser from "../general/CurrentUser";
import CardWrapper from "../general/CardWrapper";
import TabWrapper from "../general/TabWrapper";

const Account = () => {

    const image = useRef();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")));

    useEffect(() => {
        dispatch(fetchProfiles());
    }, []);


    const userState = useSelector((state) => state.userState);
    const profileState = useSelector((state) => state.profileState);
    const profiles = profileState.profiles;
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("currentUser")));

    const formHandler = (el) => {
        setUser({
            ...user,
            [el.target.name]: el.target.value
        })
    }

    const handleFormSubmition = async (el) => {
        el.preventDefault();

        const formData = new FormData();

        formData.append("user[name]", user.name);
        formData.append(`user[email]`, user.email);

        if (user.password != undefined && user.password.length > 0) {
            formData.append(`user[password]`, user.password);
        }

        if (image.current.files[0]) {
            formData.append('user[image]', image.current.files[0]);
        }

        let treatedUserObject = { ...user }

        if (treatedUserObject.id) {
            formData.append("user[id]", treatedUserObject.id);
            dispatch(updateUser(formData))
                .then(() => {
                    dispatch(showToast({ success: true, message: firstCapitalize(t('updated_succeed')) }));
                });
        }
    }

    return (
        <>
            <CardWrapper centralize={true}>
                <TabWrapper size={70}>
                     <h1 className="text-3xl p-2">{firstCapitalize(t('profile'))}</h1>
                    <form onSubmit={handleFormSubmition} className='p-[0_0.5rem] sm:p-[0_8rem] h-[100%] mt-[1rem] flex flex-col gap-6'>
                        <div className="flex justify-center p-[10px]">
                            <div className="w-[130px] h-[130px] sm:w-[200px] sm:h-[200px]">
                                <img src={currentUser.image} className="w-[100%] h-[100%] rounded-[50%] cursor-pointer shadow-lg" />
                            </div>
                        </div>

                        <input type='text' onChange={formHandler} name="name" value={user.name} className='p-1 rounded w-[100%] outline-none' />

                        <input type='email' onChange={formHandler} name="email" value={user.email} className='p-1 rounded w-[100%] outline-none' />

                        {(user.id == JSON.parse(localStorage.getItem("currentUser")).id || user.id == undefined) &&
                            <input type='password' onChange={formHandler} name="password" className='p-1 rounded w-[100%] outline-none' />
                        }


                        <input type="file" name="image" ref={image} />
                        <div className="flex justify-center p-2 mt-auto"><button className="p-2 bg-green-100 rounded">{firstCapitalize(t('update'))}</button></div>
                    </form>
                </TabWrapper>
            </CardWrapper>
        </>
    );
};

export default Account;
