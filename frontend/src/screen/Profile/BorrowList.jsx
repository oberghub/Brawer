import React, { useEffect, useState } from "react";
import {
  AiOutlineCreditCard,
  AiOutlineBank,
  AiOutlineQrcode,
} from "react-icons/ai";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useSelector } from "react-redux";
const dns = "https://jo1a3f0ow5.execute-api.us-east-1.amazonaws.com/proxy";
export const BorrowList = () => {
  const user = useSelector((state) => state.user_data.user);
  const [borrowList, setBorrowList] = useState([
    // {
    //     borrowId: "asdiqoqwe22212",
    //     b_date: '15 December 2022',
    //     d_date: '16 December 2022',
    //     late: true,
    //     books: [
    //         {
    //             title: 'Think Python : How to Think Like a Computer Scientist 2nd Edition',
    //             desc: 'Think Python is an introduction to Python programming for beginners. It starts with basic concepts of programming; it is carefully designed to define all terms when they are first used and to develop each new concept in a logical progression. Larger pieces, like recursion and object-oriented programming, are divided into a sequence of smaller steps and introduced over the course of several chapters.',
    //             img: '../../local_image/book_ex.jpg',
    //             quantity: 2,
    //         },
    //         {
    //             title: 'Think Java: How to Think Like a Computer Scientist 2nd Edition',
    //             desc: 'Think Java is a hands-on introduction to computer science and programming used by many universities and high schools around the world. Its conciseness, emphasis on vocabulary, and informal tone make it particularly appealing for readers with little or no experience. The book starts with the most basic programming concepts and gradually works its way to advanced object-oriented techniques. In this fully updated and expanded edition, authors Allen Downey and Chris Mayfield introduce programming as a means for solving interesting problems. Each chapter presents material for one week of a college course and includes exercises to help you practice what you have learned. Along the way, you’ll see nearly every topic required for the AP Computer Science A exam and Java SE Programmer I certification.',
    //             img: '../../local_image/book_ex.jpg',
    //             quantity: 1,
    //         },
    //     ]
    // },
    // {
    //     borrowId: "asd012klje32d",
    //     b_date: '15 December 2022',
    //     d_date: '19 December 2022',
    //     late: false,
    //     books: [
    //         {
    //             title: 'Think Python : How to Think Like a Computer Scientist 2nd Edition',
    //             desc: 'Think Python is an introduction to Python programming for beginners. It starts with basic concepts of programming; it is carefully designed to define all terms when they are first used and to develop each new concept in a logical progression. Larger pieces, like recursion and object-oriented programming, are divided into a sequence of smaller steps and introduced over the course of several chapters.',
    //             img: '../../local_image/book_ex.jpg',
    //             quantity: 2,
    //         },
    //     ]
    // }
  ]);
  const [paymentMethod, setMethod] = useState([
    {
      type: "Credit / Debit",
      icon: <AiOutlineCreditCard size={100} className="m-auto" />,
    },
    {
      type: "Bank Transfer",
      icon: <AiOutlineBank size={100} className="m-auto" />,
    },
    {
      type: "QR Code",
      icon: <AiOutlineQrcode size={100} className="m-auto" />,
    },
  ]);
  const [payAfineModal, setPayAFineModal] = useState(false);
  const [selectPaymentMethod, setSelectPayment] = useState(null);
  const [confirmPaymentModal, setConfirmPaymentModal] = useState(false);
  const [confirmText, setConfirmText] = useState();

  const [borrowToPay, setBorrowToPay] = useState(null);
  const [currentDate, setCurrentDate] = useState("1978-12-01");
  const [lateDays, setLateDays] = useState(0);
  const [price, setPrice] = useState(0);

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (borrowToPay) {
      let nowdate = new Date().toISOString().substring(0, 10);
      const dueDate = new Date(borrowToPay.d_date);
      const returnDate = new Date(nowdate);
      const difference = returnDate - dueDate;
      const daysLate = Math.ceil(difference / (1000 * 60 * 60 * 24));
      setPrice(
        daysLate *
          15 *
          nodupe(borrowToPay.books)
            .map((item) => item.qty)
            .reduce((a, b) => a + b)
      );
      setLateDays(daysLate);
      setCurrentDate(nowdate);
    }
  }, [borrowToPay]);
  const handleChange = (event) => {
    setConfirmText(event.target.value);
  };
  const confirmPayment = () => {
    setConfirmPaymentModal(false);
    let ts = new Date().toISOString();
    // setConfirmModal(true)
    let addPayment = {
      userId: user._id,
      reserveId: "",
      status: "SUCCESS",
      timestamp: ts.substring(0, 10) + " " + ts.substring(11, 19),
      price: price,
      borrowId: borrowToPay.borrowId,
    };
    console.log(addPayment);
    axios
      .post(
        "http://localhost:8082/payment-service/payment",
        JSON.stringify(addPayment),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) =>
        console.log(res.status + " " + res.statusText + " " + res.data)
      );
  };
  const nodupe = (arr = []) => {
    return arr.reduce((acc, item) => {
      let index = acc.map((item) => item._id).indexOf(item._id);
      if (index != -1) {
        acc[index].qty++;
      } else {
        acc.push({ ...item, qty: 1 });
      }
      return acc;
    }, []);
  };
  useEffect(() => {
    (async () => {
      let borrowList = [];
      await axios
        .get(dns + "/borrow/" + user._id, {})
        .then(async (res) => {
          if (res.status == 200) {
            for (let i = 0; i < res.data.length; i++) {
              let bookIds = [...res.data[i].booksId];
              let books = await (
                await axios.get(dns + "/books/" + bookIds.join(","), {})
              ).data;
              let borrow = {
                borrowId: res.data[i]._id,
                b_date: res.data[i].borrow_date,
                d_date: res.data[i].due_date,
                late: res.data[i].late,
                status: res.data[i].status,
                userId: res.data[i].userId,
                books: books,
              };
              borrowList.push(borrow);
            }
          }
        })
        .catch((e) => console.log(e));
      console.log(borrowList);
      setBorrowList(borrowList);
      setIsLoaded(true);
    })();
  }, [user]);
  return (
    <div className="w-full">
      {confirmPaymentModal ? (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded flex justify-center slide-down-fade">
              <div className="">
                <div className="w-full border-b-[1px] border-gray-300">
                  <p className="text-3xl Gentium-B-font mb-5">
                    Type To Confirm Payment
                  </p>
                </div>
                <Box
                  className="my-8"
                  sx={{
                    width: 500,
                    maxWidth: "100%",
                  }}
                >
                  <p className="text-xl mb-3">
                    Type <b>'Confirm'</b> to confirm a payment.
                  </p>
                  <TextField
                    fullWidth
                    placeholder="OkBaeTonk"
                    label=""
                    id="typeToConfirm"
                    value={confirmText}
                    onChange={handleChange}
                  />
                </Box>
                <div className="w-full flex items-center justify-center gap-3 mt-7">
                  <div
                    onClick={() => {
                      setConfirmPaymentModal(false);
                    }}
                    className="rounded bg-[#EEE] hover:bg-[#E1E1E1] flex items-center justify-center w-[100px] md:w-[150px] h-[50px] cursor-pointer"
                  >
                    <p className="text-2xl">Cancel</p>
                  </div>
                  {confirmText == "Confirm" ? (
                    <div
                      onClick={() => {
                        confirmPayment();
                      }}
                      className="rounded bg-[#2F5D62] hover:bg-[#2B5155] text-white flex items-center justify-center w-[100px] md:w-[150px] h-[50px] cursor-pointer"
                    >
                      <p className="text-2xl">Confirm</p>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      {payAfineModal ? (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded flex justify-center slide-down-fade">
              <div className="">
                <div className="w-full bg-[#FAFAFA] drop-shadow-xl p-5">
                  <div className="border-b-[1px] border-gray-300">
                    <p className="text-3xl Gentium-B-font mb-3">Pay a fine</p>
                  </div>
                  <div className="mt-3 relative flex">
                    <p className="text-xl">Due Date</p>
                    <p className="text-xl absolute right-[5%]">
                      {borrowToPay.d_date}
                    </p>
                  </div>
                  <div className="relative flex">
                    <p className="text-xl">Return Date :</p>
                    <p className="text-xl absolute right-[5%]">{currentDate}</p>
                  </div>
                  <div className="relative flex">
                    <p className="text-xl">Total Late :</p>
                    <p className="text-xl absolute right-[5%]">
                      {lateDays} Day
                    </p>
                  </div>
                  <div className="relative flex text-2xl border-t-[1px] border-gray-300 my-5">
                    <p className="Gentium-B-font mt-3">Total : </p>
                    {/* เงื่อนไขการคิดเงินคือ ถ้าคืนช้า วันละ15บาทคูณกับจำนวนวันทั้งหมด และคูณอีกว่ายืมไปกี่เล่ม ถ้า2เล่มก็คูณ2 ex(สมมติชื่อตัวแปรเฉยๆ). (totalLate * 15 * bookCount) */}
                    <p className="absolute right-[5%] mt-3">{price} THB</p>
                  </div>
                </div>
                <div className="bg-[#FAFAFA] drop-shadow-xl p-5">
                  <div className="border-b-[1px] border-gray-300">
                    <p className="text-2xl sm:text-3xl Gentium-B-font mb-[0.5em]">
                      Choose Payment Method
                    </p>
                  </div>
                  <div className="flex gap-5 overflow-x-scroll">
                    {paymentMethod.map((item, index) => (
                      <>
                        {index == selectPaymentMethod ? (
                          <div
                            onClick={() => {
                              setSelectPayment(index);
                            }}
                            className="w-[150px] sm:h-[150px] text-center cursor-pointer bg-gray-200 my-5 p-3 rounded drop-shadow-xl"
                          >
                            {item.icon}
                            <p className="text-xl">{item.type}</p>
                          </div>
                        ) : (
                          <div
                            onClick={() => {
                              setSelectPayment(index);
                            }}
                            className="w-[150px] sm:h-[150px] text-center cursor-pointer bg-gray-100 my-5 p-3 rounded drop-shadow-xl"
                          >
                            {item.icon}
                            <p className="text-xl">{item.type}</p>
                          </div>
                        )}
                      </>
                    ))}
                  </div>
                </div>
                <div className="w-full flex items-center justify-center gap-3 mt-7">
                  <div
                    onClick={() => {
                      setPayAFineModal(false);
                    }}
                    className="rounded bg-[#EEE] hover:bg-[#E1E1E1] flex items-center justify-center w-[100px] md:w-[150px] h-[50px] cursor-pointer"
                  >
                    <p className="text-2xl">Back</p>
                  </div>
                  {selectPaymentMethod == null ? (
                    <div className="rounded bg-[#E5E5E5] opacity-50 flex items-center justify-center w-[100px] md:w-[150px] h-[50px] cursor-default">
                      <p className="text-2xl">Confirm</p>
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        setConfirmPaymentModal(true);
                        setPayAFineModal(false);
                      }}
                      className="rounded bg-[#2F5D62] hover:bg-[#2B5155] text-white flex items-center justify-center w-[100px] md:w-[150px] h-[50px] cursor-pointer"
                    >
                      <p className="text-2xl">Confirm</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      {isLoaded ? (
        <p className="text-3xl Gentium-B-font">Borrow History</p>
      ) : (
        <p className="text-3xl Gentium-B-font">Borrow History (Loading...)</p>
      )}
      {borrowList.map((item, index) => (
        <>
          {/* Book card */}
          <div
            className="w-full bg-white drop-shadow-xl rounded p-5 relative mb-10"
            key={index}
          >
            {/* Card Header */}
            <div className="w-full text-2xl">
              {/* Borrow Date */}
              <div className="w-full flex relative">
                <div className="flex">
                  <div className="w-[150px] Gentium-B-font">
                    <p>Borrow Date</p>
                  </div>
                  <div className="">
                    <p>{item.b_date}</p>
                  </div>
                </div>
                <div className="hidden lg:block lg:absolute right-0">
                  <p>
                    Total :{" "}
                    {nodupe(item.books)
                      .map((item) => item.qty)
                      .reduce((a, b) => a + b)}{" "}
                    ea
                  </p>
                </div>
              </div>
              <div className="w-full lg:flex relative mb-10">
                <div className="flex">
                  <div className="w-[150px] Gentium-B-font">
                    <p>Due Date</p>
                  </div>
                  <div className="">
                    <p>{item.d_date}</p>
                  </div>
                </div>
                <div className="lg:hidden">
                  <p>
                    Total :{" "}
                    {nodupe(item.books)
                      .map((item) => item.qty)
                      .reduce((a, b) => a + b)}{" "}
                    ea
                  </p>
                </div>
                {item.late ? (
                  <>
                    <div
                      className="lg:absolute right-0"
                      onClick={() => {
                        console.log(item);
                        setBorrowToPay(item);
                        setPayAFineModal(true);
                      }}
                    >
                      <p>
                        You are late!{" "}
                        <u className="text-red-500 cursor-pointer ml-3">
                          Pay a fine
                        </u>
                      </p>
                    </div>
                  </>
                ) : null}
              </div>
              <div className="w-full lg:flex relative mb-10">
                <div className="flex">
                  <div className="w-[150px] Gentium-B-font">
                    <p>Status</p>
                  </div>
                  <div className="">
                    <p>{item.status}</p>
                  </div>
                </div>
              </div>
            </div>
            {nodupe(item.books).map((books, index) => (
              <>
                <div className="w-full sm:h-auto bg-white drop-shadow min-[450px]:flex mt-3 p-0">
                  <div className="w-auto">
                    <img
                      src={books.image}
                      className="min-[450px]:w-[180px] min-[450px]:h-[220px] cursor-pointer"
                      alt="book"
                    />
                  </div>
                  <div className="min-[450px]:w-full p-5">
                    <p className="text-xl min-[450px]:text-2xl line-clamp-2">
                      {books.title}
                    </p>
                    <b className="text-lg min-[450px]:text-xl">x{books.qty}</b>
                  </div>
                </div>
              </>
            ))}
          </div>
        </>
      ))}
    </div>
  );
};
