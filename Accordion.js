import "./accordion.css";
import {
  RiDeleteBinLine,
  RiEdit2Line,
  RiCloseCircleLine,
} from "react-icons/ri";
import { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";

let initialRender = 0;

const Accordion = (props) => {
  useEffect(() => {
    if (initialRender > 1) {
      setUserAge(calculateAge(props.celeb.dob));
      setUserGender(props.celeb.gender);
      setUserName(props.celeb.first + " " + props.celeb.last);
      setUserCountry(props.celeb.country);
      setUserDescription(props.celeb.description);
      setEditName(props.celeb.first + " " + props.celeb.last);
      setEditAge(calculateAge(props.celeb.dob));
      setEditGender(props.celeb.gender);
      setEditDescription(props.celeb.description);
      setEditCountry(props.celeb.country);
      setEnableSave(false);
    } else {
      initialRender++;
    }
  }, [props]);
  const calculateAge = (birthday) => {
    if (birthday.length > 4) {
      const ageDifMs = Date.now() - new Date(birthday).getTime();
      const ageDate = new Date(ageDifMs);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    } else {
      return birthday;
    }
  };
  const [userAge, setUserAge] = useState(calculateAge(props.celeb.dob));
  const [userGender, setUserGender] = useState(props.celeb.gender);
  const [userName, setUserName] = useState(
    props.celeb.first + " " + props.celeb.last
  );
  const [userCountry, setUserCountry] = useState(props.celeb.country);
  const [userDescription, setUserDescription] = useState(
    props.celeb.description
  );
  const [edit, setEdit] = useState(0);
  const [deleteAccordion, setDeleteAccordion] = useState(false);
  const [editName, setEditName] = useState(
    props.celeb.first + " " + props.celeb.last
  );
  const [editAge, setEditAge] = useState(calculateAge(props.celeb.dob));
  const genderList = [
    "male",
    "female",
    "transgender",
    "rather not say",
    "other",
  ];
  const [editGender, setEditGender] = useState(props.celeb.gender);
  const [editCountry, setEditCountry] = useState(props.celeb.country);
  const [editDescription, setEditDescription] = useState(
    props.celeb.description
  );
  const [enableSave, setEnableSave] = useState(false);
  const handleEdit = () => {
    setEdit(1);
  };
  const handleAgeChange = (e) => {
    setEditAge(e.target.value);
    setEnableSave(true);
  };
  const handleGenderChange = (e) => {
    setEditGender(e.target.value);
    setEnableSave(true);
  };
  const handleCountryChange = (e) => {
    const re = /[^A-Za-z]/;

    setEditCountry(e.target.value.replace(/[^A-Za-z]/gi, ""));
    setEnableSave(true);
  };
  const handleDescriptionChange = (e) => {
    setEditDescription(e.target.value);
    setEnableSave(true);
  };
  const handleNameChange = (e) => {
    setEditName(e.target.value);
    setEnableSave(true);
  };
  const handleCancel = () => {
    setEdit(0);
    setEditName(props.celeb.first + " " + props.celeb.last);
    setEditAge(calculateAge(props.celeb.dob));
    setEditGender(props.celeb.gender);
    setEditCountry(props.celeb.country);
    setEditDescription(props.celeb.description);
    setEnableSave(false);
  };
  const handleDelete = () => {
    props.deleteUser(props.celeb);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let fullName = editName.split(" ");
    const updatedUser = {
      id: props.celeb.id,
      first: fullName[0],
      last: fullName[fullName.length - 1],
      dob: editAge,
      gender: editGender,
      email: props.celeb.email,
      picture: props.celeb.picture,
      country: editCountry,
      description: editDescription,
    };
    props.updateUser(updatedUser, edit, setEdit);
  };

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-8">
          <form onSubmit={handleSubmit}>
            <div className="accordion-item my-2">
              {deleteAccordion ? (
                <>
                  <div className="row justify-content-between mx-1 my-3">
                    <div className="col-auto">
                      <p>Are you sure you want to delete ?</p>
                    </div>
                    <div className="col-auto">
                      <button
                        type="button"
                        className="btn"
                        onClick={() => setDeleteAccordion(false)}
                      >
                        <RiCloseCircleLine className="accordion-icon-cancel" />
                      </button>
                    </div>
                  </div>
                  <div className="row justify-content-end my-3 mx-3 my-3">
                    <div className="col-auto">
                      <button
                        type="button"
                        className="btn accordion-button-cancel"
                        onClick={() => setDeleteAccordion(false)}
                      >
                        Cancel
                      </button>
                    </div>
                    <div className="col-auto">
                      <button
                        type="button"
                        className="btn accordion-button-delete"
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h1
                    className="accordion-header"
                    id={`heading${props.celeb.id}`}
                  >
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${props.celeb.id}`}
                      aria-expanded="false"
                      aria-controls={`collapse${props.celeb.id}`}
                    >
                      <img
                        src={props.celeb.picture}
                        alt=""
                        className="d-inline-block align-text-top userimage"
                      ></img>
                      <span className="accordion-heading">
                        &nbsp;&nbsp;
                        {edit === 1 ? (
                          <>
                            <input
                              type="text"
                              value={editName}
                              required
                              onChange={handleNameChange}
                            />
                          </>
                        ) : (
                          <>{userName}</>
                        )}
                      </span>
                    </button>
                  </h1>
                  <div
                    id={`collapse${props.celeb.id}`}
                    className="accordion-collapse collapse"
                    aria-labelledby={`heading${props.celeb.id}`}
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      {edit == 0 ? (
                        <>
                          <div className="row justify-content-start">
                            <div className="col-4">
                              <label className="form-label accordion-body-title">
                                Age
                              </label>
                              <p>{`${userAge} Years`}</p>
                            </div>
                            <div className="col-4">
                              <label className="form-label accordion-body-title">
                                Gender
                              </label>
                              <p>{userGender}</p>
                            </div>
                            <div className="col-4">
                              <label className="form-label accordion-body-title">
                                Country
                              </label>
                              <p>{userCountry}</p>
                            </div>
                          </div>
                          <div className="row justify-content-start">
                            <div className="col-12">
                              <label className="form-label accordion-body-title">
                                Description
                              </label>
                              <p>{userDescription}</p>
                            </div>
                          </div>
                          <div className="row justify-content-end">
                            <div className="col-auto">
                              <button
                                type="button"
                                className="btn"
                                onClick={() => setDeleteAccordion(true)}
                              >
                                <RiDeleteBinLine className="accordion-icon-delete" />
                              </button>
                            </div>
                            {userAge >= 18 ? (
                              <div className="col-auto">
                                <button
                                  type="button"
                                  className="btn"
                                  onClick={handleEdit}
                                >
                                  <RiEdit2Line className="accordion-icon-edit" />
                                </button>
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="row justify-content-start">
                            <div className="col-4">
                              <label className="form-label accordion-body-title">
                                Age
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                aria-describedby="emailHelp"
                                value={editAge}
                                onChange={handleAgeChange}
                                required
                              />
                            </div>
                            <div className="col-4">
                              <label className="form-label accordion-body-title">
                                Gender
                              </label>
                              <select
                                className="form-select"
                                aria-label="Default select example"
                                onChange={handleGenderChange}
                              >
                                <option selected>{editGender}</option>
                                {genderList.map((gender, index) => {
                                  if (gender === editGender) {
                                  } else {
                                    return (
                                      <option value={gender} key={index}>
                                        {gender}
                                      </option>
                                    );
                                  }
                                })}
                              </select>
                            </div>
                            <div className="col-4">
                              <label className="form-label accordion-body-title">
                                Country
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                aria-describedby="emailHelp"
                                value={editCountry}
                                required
                                onChange={handleCountryChange}
                              />
                            </div>
                          </div>
                          <div className="row justify-content-start my-2">
                            <div className="col-12">
                              <label className="form-label accordion-body-title">
                                Description
                              </label>
                              <textarea
                                className="form-control"
                                rows={4}
                                id="exampleFormControlTextarea1"
                                value={editDescription}
                                required
                                onChange={handleDescriptionChange}
                              ></textarea>
                            </div>
                          </div>
                          <div className="row justify-content-end">
                            <div className="col-auto">
                              <button
                                type="button"
                                className="btn"
                                onClick={handleCancel}
                              >
                                <RiCloseCircleLine className="accordion-icon-cancel" />
                              </button>
                            </div>
                            <div className="col-auto">
                              <button
                                type="submit"
                                className="btn"
                                disabled={enableSave ? false : true}
                              >
                                <TiTick className="accordion-icon-save" />
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Accordion;
