import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import swal from "sweetalert2";

const axios = require("axios");
const baseUrl = process.env.REACT_APP_URL;

export function EditBeneficiary(props) {
  const { isEditModalOpen, handleEditModalClose, getBeneficiaries } = props;
  const [beneficiary, setBeneficiary] = useState(props.beneficiary);
  const [authenticated, setAuthenticated] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);

  useEffect(() => {
    if (isEditModalOpen) {
      setShowPasswordPrompt(true);
    } else {
      setAuthenticated(false);
      setShowPasswordPrompt(false);
    }
  }, [isEditModalOpen]);



  
  const handlePasswordPrompt = () => {
    swal
      .fire({
        title: "Enter password",
        input: "password",
        showCancelButton: true,
        preConfirm: (password) => {
          if (password === "1234") {
            setAuthenticated(true);
          } else {
            swal.showValidationMessage("Invalid password!");
          }
        },
      })
      .then((result) => {
        if (result.isDismissed) {
          handleEditModalClose();
        }
      });
  };

  async function updateBeneficiary(e) {
    e.preventDefault();

    if (!authenticated) {
      handlePasswordPrompt();
      return;
    }

    try {
      const res = await axios.patch(`${baseUrl}/beneficiary/${beneficiary._id}`, {
        beneficiary: beneficiary,
      });

      if (res.status === 200) {
        handleEditModalClose();
        swal.fire({
          text: "School Successfully Updated",
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
        });
        getBeneficiaries();
      } else {
        swal({
          text: res?.data?.errorMessage,
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error);
      swal.fire("Update Failed", "An error occurred while updating the beneficiary. Please try again.", "error");
    }
  }

  function update(event) {
    let { name, value } = event.target;
  
    if (value === null) {
      value = "";
    }
  
    if (name === "beneficiaryId") {
      setBeneficiary((prevBeneficiary) => ({
        ...prevBeneficiary,
        beneficiaryId: value,
        u_nm: `${value}-L1`,
        f_nm: `${value}-P12`,
      }));
    } else {
      setBeneficiary((prevBeneficiary) => ({
        ...prevBeneficiary,
        [name]: value,
      }));
    }
  }
  

  return (
    <>
      {showPasswordPrompt && !authenticated && (
        <div>
          {handlePasswordPrompt()}
        </div>
      )}

      {authenticated && (
        <Dialog
          open={isEditModalOpen}
          onClose={handleEditModalClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          style={{ zIndex: "99999" }}
          maxWidth="xs"
        >
          <DialogContent style={{ padding: "40px" }}>
            <DialogTitle id="alert-dialog-title">
              <span style={{ color: "#138D75" }}>
                {" "}
                <b> Edit School </b>{" "}
              </span>
            </DialogTitle>
            <br />
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="beneficiaryId"
              value={beneficiary.beneficiaryId}
              onChange={update}
              placeholder="School EIIN"
              required
              fullWidth
            />
            <br />
            <br />
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="name"
              value={beneficiary.name}
              onChange={update}
              placeholder="School Name"
              required
              fullWidth
            />
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="u_nm"
              value={beneficiary.u_nm}
              onChange={update}
              placeholder="Lab Id"
              fullWidth
            />
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="f_nm"
              value={beneficiary.f_nm}
              onChange={update}
              placeholder="PC Id"
              fullWidth
            />
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          </DialogContent>

          <DialogActions style={{ paddingRight: "80px", paddingBottom: "30px" }}>
            <Button
              onClick={handleEditModalClose}
              color="primary"
              style={{ backgroundColor: "#34495E", color: "white" }}
            >
              Cancel
            </Button>
            <Button
              onClick={updateBeneficiary}
              color="primary"
              autoFocus
              style={{ backgroundColor: "#138D75", color: "white" }}
            >
              Updated School
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}