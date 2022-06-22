import React from "react";
import { useHistory } from "react-router-dom";
import { register } from "../../services/Auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RegisterPage(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [image, setImage] = React.useState("");
  const PROFESSIONS = [
    "Engineer",
    "Doctor",
    "Teacher",
    "Lawyer",
    "Accountant",
    "Businessman",
    "Artist",
    "Writer",
    "Photographer",
    "Military",
    "Other",
  ];

  const handleImageUpload = (e) => {
    const files = e.target.files;

    if (files && files[0]) {
      setImage(files[0]);
    }
  };
  const [profession, setProfession] = React.useState("");
  const [dob, setDob] = React.useState(new Date());
  const history = useHistory();
  const handleSubmit = () => {
    register({ name, email, password, profession, dob, image })
      .then((res) => {
        //   history.push("/");
        toast.success("Registered Successfully ", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((e) => {
        toast.error("Register Failed " + JSON.stringify(e.response.data), {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <section class="h-full gradient-form bg-gray-200 md:h-screen">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div class=" w-screen items-center justify-center flex py-12 px-6 h-full">
        <div class="flex justify-center items-center flex-wrap g-6 text-gray-800">
          <div class="xl:w-10/12">
            <div class="block bg-white shadow-lg rounded-lg">
              <div class="lg:flex lg:flex-wrap g-0">
                <div
                  style={{
                    // background:
                    //   "linear-gradient(256deg, rgba(58,180,152,1) 0%, rgba(29,176,253,1) 50%, rgba(127,69,252,1) 100%)",
                    backgroundImage:
                      "url(https://a4td.org/wp-content/uploads/2019/02/iStock-686999300-2000x1333.jpg)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                  class="lg:w-6/12   flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none"
                >
                  <div class="backdrop-blur-sm bg-white/30 text-white px-4 py-6 md:p-12 md:mx-6">
                    <h4 class="text-xl font-semibold mb-6">
                      A complete end solution for your community Services
                    </h4>
                    <p class="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
                <div class="lg:w-6/12 px-4 md:px-0">
                  <div class="md:p-12 md:mx-6">
                    <div class="text-center">
                      <h4 class="text-xl font-semibold mt-1 mb-12 pb-1">
                        We are The Veteran Meet
                      </h4>
                    </div>
                    <form>
                      <p class="mb-4">Please Enter the Following Details</p>
                      <div class="mb-4">
                        <input
                          type="text"
                          class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          placeholder="Name"
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                        />
                      </div>
                      <div class="mb-4">
                        <input
                          type="text"
                          class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          placeholder="Username"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                        />
                      </div>

                      <div class="mb-4">
                        <input
                          type="password"
                          class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="exampleFormControlInput1"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>

                      <div class="mb-4">
                        <select
                          onChange={(e) => setProfession(e.target.value)}
                          value={profession}
                          class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        >
                          <option disabled selected>
                            Profession
                          </option>
                          {PROFESSIONS.map((profession) => (
                            <option value={profession}>{profession}</option>
                          ))}
                        </select>
                      </div>

                      <div class="mb-4 flex flex-row justify-between items-center">
                        {/* Date of birth field */}
                        <label
                          class="text-sm font-medium leading-5 text-gray-700"
                          for="date-of-birth"
                        >
                          Date of Birth
                        </label>
                        <div class=" ">
                          <input
                            type="date"
                            class="form-control block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="exampleFormControlInput1"
                            placeholder="Date of Birth"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* user image input */}
                      <div class="mb-4 flex flex-row justify-between items-center">
                        <input
                          type="file"
                          onChange={handleImageUpload}
                          accept="image/*"
                          name="myfile"
                        />
                      </div>

                      <div class="text-center pt-1 mb-12 pb-1">
                        <button
                          class="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                          type="button"
                          data-mdb-ripple="true"
                          data-mdb-ripple-color="light"
                          onClick={handleSubmit}
                          style={{
                            background:
                              "linear-gradient(256deg, rgba(58,180,152,1) 0%, rgba(29,176,253,1) 50%, rgba(127,69,252,1) 100%)",
                          }}
                        >
                          Register
                        </button>
                      </div>
                      <div class="flex items-center justify-between pb-6">
                        <p class="mb-0 mr-2">Already have an account?</p>
                        <button
                          type="button"
                          class="inline-block px-6 py-2 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                          data-mdb-ripple="true"
                          data-mdb-ripple-color="light"
                          onClick={() => history.push("/login")}
                          style={{
                            background:
                              "linear-gradient(256deg, rgba(58,180,152,1) 0%, rgba(29,176,253,1) 50%, rgba(127,69,252,1) 100%)",
                          }}
                        >
                          Sign In
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
