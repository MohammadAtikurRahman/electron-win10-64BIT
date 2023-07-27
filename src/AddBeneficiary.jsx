import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Popper from "@material-ui/core/Popper";
import swal from "sweetalert";
import Swal from "sweetalert2";

const axios = require("axios");
const baseUrl = process.env.REACT_APP_URL;

export function AddBeneficiary(props) {
  const { isEditModalOpen, handleEditModalClose, getBeneficiaries } = props;
  const [beneficiary, setBeneficiary] = useState({});
  const [error, setError] = useState(false);

  const [eiinInput, setEiinInput] = useState("");
  const [nameInput, setNameInput] = useState("");

  const [submit, setSubmit] = useState(false);

  // Schools data
  const schools = [
    { eiin: "111794", name: "Sakhuya Adarsha Biddyaniketan" },
{ eiin: "130875", name: "Shaheed Muktijoddha Girls High School" },
{ eiin: "107827", name: "Ruhul Amin Khan Uccho Biddaloy" },
{ eiin: "104414", name: "Fateyabad Mohakali Balika Uccho Biddaloy" },
{ eiin: "106916", name: "Shyamganj Uccho Biddaloy" },
{ eiin: "138307", name: "Biam Laboratory School" },
{ eiin: "117769", name: "The Old Kushtia HighSchool" },
{ eiin: "131212", name: "Chulash Adarsha Uccho Biddaloy" },
{ eiin: "106012", name: "Bishnapur Uccho Biddaloy" },
{ eiin: "105990", name: "Chandanail Maddhomik Biddaloy" },
{ eiin: "104746", name: "Kusumpura Union Uccho Biddaloy" },
{ eiin: "104424", name: "Gumanmarthan Peshkarhat Uccho Biddaloy" },
{ eiin: "104422", name: "Forhadabad Uccho Biddaloy" },
{ eiin: "106892", name: "Muslimabad Uccho Biddaloy" },
{ eiin: "132208", name: "Gazipur Residential Model School and College" },
{ eiin: "109543", name: "Pinzuri Union Uccho Biddaloy" },
{ eiin: "108053", name: "Noorjahan Begum Uccho Biddaloy" },
{ eiin: "100796", name: "Karapur Popular Maddhomik Biddaloy" },
{ eiin: "109905", name: "Shreepur Kumaria Nasuba Hakim Balika Uccho Biddaloy" },
{ eiin: "113119", name: "Birampur Uccho Biddaloy" },
{ eiin: "111780", name: "Rajibpur Aptab Uddin Uccho Biddaloy" },
{ eiin: "127800", name: "Jahangirabad Uccho Biddaloy" },
{ eiin: "127502", name: "Mahiganj Balika Uccho Biddaloy and College" },
{ eiin: "124166", name: "Barogachha Balika Uccho Biddaloy" },
{ eiin: "136801", name: "Sylhet Inclusive School and College" },
{ eiin: "104732", name: "Kashiaish Uccho Biddaloy" },
{ eiin: "104421", name: "Dr. Shahidulla Academy" },
{ eiin: "106900", name: "Rasulganj Bohumukhi Uccho Biddaloy" },
{ eiin: "108990", name: "Meghdubi Adarsha Uccho Biddaloy" },
{ eiin: "135101", name: "Bir Muktijoddha Shaheed Ahsan Ullah Master School and College" },
{ eiin: "108330", name: "Bangladesh Adarsha Shikkha Niketan" },
{ eiin: "108347", name: "Shanhuri Model High School" },
{ eiin: "108081", name: "Banani Model Uccho Biddaloy" },
{ eiin: "109881", name: "Nandina M.H.K Sarkari Pilot Uccho Biddaloy" },
{ eiin: "110001", name: "Nurandi School and College" },
{ eiin: "109864", name: "K H Shamsul Haque Uccho Biddaloy" },
{ eiin: "111797", name: "Abdul Khaleq Moksuda Uccho Biddaloy" },
{ eiin: "111867", name: "Paranganj Uccho Biddaloy" },
{ eiin: "111835", name: "Police Lines Uccho Biddaloy" },
{ eiin: "111859", name: "Char Kharicha Uccho Biddaloy" },
{ eiin: "121189", name: "Laxmipur School and College" },
{ eiin: "121135", name: "Kamarzani Banik Balika Uccho Biddaloy" },
{ eiin: "130419", name: "Mirzajangal Balika Uccho Biddaloy" },
{ eiin: "117781", name: "Ranjitpur Maddhomik Biddaloy" },
{ eiin: "105594", name: "Maricha S A High School" },
{ eiin: "138308", name: "Radhanagar Nimno Maddhomik Biddaloy" },
{ eiin: "106023", name: "Payab Haji Abdul Gani Uccho Biddaloy" },
{ eiin: "104053", name: "Kulgaon City Corporation Uccho Biddaloy" },
{ eiin: "104606", name: "Mithachhara Uccho Biddaloy" },
{ eiin: "104622", name: "Meghadiya Nurul Afsar Chowdhury Uccho Biddaloy" },
{ eiin: "104592", name: "Durgapur Nogendra Chandra Uccho Biddaloy" },
{ eiin: "104405", name: "Kuwaish Burirchar Sammiloni Uccho Biddaloy" },
{ eiin: "106894", name: "MohaBiddaloy Banga Khan Uccho Biddaloy" },
{ eiin: "109671", name: "Tarail Adarsha Uccho Biddaloy" },
{ eiin: "109660", name: "Guyadhana Silna Bindu Basini Uccho Biddaloy" },
{ eiin: "109667", name: "Banshbaria JhanJhania Maddhomik Biddaloy" },
{ eiin: "108521", name: "Rajdhani Uccho Biddaloy" },
{ eiin: "100802", name: "Profullanaha Balika Maddhomik Biddaloy" },
{ eiin: "100767", name: "Chandpura Union Maddhomik Biddaloy" },
{ eiin: "109871", name: "Iqbalpur Balika Uccho Biddaloy" },
{ eiin: "109882", name: "Digpaip D.K Uccho Biddaloy" },
{ eiin: "113110", name: "Khurshimul Uccho Biddaloy" },
{ eiin: "111796", name: "Dheetpur Uccho Biddaloy" },
{ eiin: "111300", name: "Medila Adarsha Uccho Biddaloy" },
{ eiin: "111286", name: "Kongsher Kool Uccho Biddaloy" },
{ eiin: "111831", name: "Nasirabad Collegiate School" },
{ eiin: "127809", name: "Matherganj Balika Uccho Biddaloy" },
{ eiin: "127386", name: "Adarsha Uccho Biddaloy" },
{ eiin: "127406", name: "Azizullah Uccho Biddaloy" },
{ eiin: "124254", name: "Chamari B.N. Uccho Biddaloy" },
{ eiin: "124293", name: "Kalinagar Uccho Biddaloy" },
{ eiin: "127035", name: "Golzarbagh Uccho Biddaloy" },
{ eiin: "130429", name: "Puran Kalaruka Adarsha Uccho Biddaloy" },
{ eiin: "117766", name: "Khorda Ailchara Maddhomik Biddaloy" },
{ eiin: "116316", name: "Kuada School and College" },
{ eiin: "116120", name: "Khajura Kathaltola Maddhomik Biddaloy" },
{ eiin: "105980", name: "Mochagora Adharsha Uccho Biddaloy" },
{ eiin: "106002", name: "Banshkait P, J UcchoBiddaloy" },
{ eiin: "104251", name: "Dakshin Halishahar Uccho Biddaloy" },
{ eiin: "104614", name: "Bamsundar Fakir Ahmmad Uccho Biddaloy" },
{ eiin: "104429", name: "AK Siddiqui Adarsha Balika Biddaloy" },
{ eiin: "104401", name: "Alipur Rahmania School and College" },
{ eiin: "106868", name: "Amini Laxmipur Begum Hamida Uccho Biddaloy" },
{ eiin: "134987", name: "Kunia Shahid Ahsan Ullah Master Uccho Biddaloy" },
{ eiin: "108955", name: "Rani Bilasrani Sarkari Balok Uccho Biddaloy" },
{ eiin: "109045", name: "Amzad Ali Sarkar Pilot Balika Uccho Biddaloy and College" },
{ eiin: "109564", name: "Kandi Uccho Biddaloy" },
{ eiin: "109665", name: "Gimadanga Adarsha Uccho Biddaloy" },
{ eiin: "108226", name: "Shukrabad Uccho Biddaloy" },
{ eiin: "112414", name: "Chittyaranjan Cotton Mills Uccho Biddaloy" },
{ eiin: "100743", name: "Asmat Ali Khan (A.K Institute)" },
{ eiin: "109932", name: "Zoka Bharuakhali Balika Biddaloy" },
{ eiin: "109915", name: "Ranrampur Uccho Biddaloy" },
{ eiin: "113113", name: "Baro Paikura Uccho Biddaloy" },
{ eiin: "113117", name: "Rabantor Adarsha Uccho Biddaloy" },
{ eiin: "111781", name: "Uchakhila Uccho Maddhomik Biddaloy" },
{ eiin: "111787", name: "Charjithor Uccho Biddaloy and College" },
{ eiin: "111775", name: "Charonkhila Uccho Biddaloy" },
{ eiin: "111826", name: "Jahir Uddin Uccho Biddaloy" },
{ eiin: "121106", name: "Piarapur Uccho Biddaloy" },
{ eiin: "121117", name: "Rebeka Habib Balika Uccho Biddaloy" },
{ eiin: "127783", name: "Bishnupur Benimadhab Sen Memorial Uccho Biddaloy" },
{ eiin: "127782", name: "Kachiman Nessa Balika Uccho Biddaloy" },
{ eiin: "127790", name: "Panbazaar D M Uccho Biddaloy" },
{ eiin: "127814", name: "Raypur Balika Uccho Biddaloy" },
{ eiin: "127399", name: "Jafarganj School and College" },
{ eiin: "127508", name: "Darshana Bachhirunnesa Uccho Biddaloy and College" },
{ eiin: "127420", name: "Medical College Public High School" },
{ eiin: "124251", name: "Vagnagarkandi Uccho Biddaloy" },
{ eiin: "116132", name: "Khedapara Pallimangal (Bohumukhi) Maddhomik Biddaloy" },
{ eiin: "105622", name: "Debiddar Alhaj Azgar Ali Munsi Balika U Biddaloy" },
{ eiin: "106071", name: "Zahapur K, F School and College" },
{ eiin: "104741", name: "Ratanpur Uccho Biddaloy" },
{ eiin: "104593", name: "Bishwa Dorbar Uccho Biddaloy" },
{ eiin: "104601", name: "Khaiyachhara Uccho Biddaloy" },
{ eiin: "104605", name: "Mithanala Ramdoyal High School" },
{ eiin: "104432", name: "Mirzapur Balika Uccho Biddaloy" },
{ eiin: "104415", name: "Madarsha Bohumukhi Uccho Biddaloy" },
{ eiin: "106878", name: "Protabganj Uccho Biddaloy" },
{ eiin: "109556", name: "Gopalpur K N Uccho Biddaloy" },
{ eiin: "112426", name: "Narayanganj Balika Uccho Biddaloy and College" },
{ eiin: "109888", name: "Sharifpur Uccho Biddaloy" },
{ eiin: "113123", name: "Hachhla Uccho Biddaloy" },
{ eiin: "113108", name: "Mohanganj Pilot Balika Uccho Biddaloy" },
{ eiin: "113120", name: "Muktijoddha Smrity Uccho Biddaloy" },
{ eiin: "113109", name: "Samaj Uccho Biddaloy" },
{ eiin: "111783", name: "Sohagi Union Uccho Maddhomik Biddaloy" },
{ eiin: "111269", name: "Rahmate Alam Academy" },
{ eiin: "127795", name: "Chander Bazaar Uccho Biddaloy" },
{ eiin: "124619", name: "Dadanchack Uccho Biddaloy" },
{ eiin: "124621", name: "Kaylar Diyer Uccho Biddaloy" },
{ eiin: "117033", name: "Mohishbathan Adarsha Balika Uccho Biddaloy" },
{ eiin: "117747", name: "Sirajul Haque Muslim Maddhomik Biddaloy" },
{ eiin: "116153", name: "Rajganj Shaheed Smriti Maddhomik Balika Biddapith" },
{ eiin: "116197", name: "Hazrakathi Maddhomik Biddaloy" },
{ eiin: "116182", name: "Bijayrampur Maddhomik Biddaloy" },
{ eiin: "115996", name: "Namez Sardar Maddhomik Biddaloy" },
{ eiin: "138309", name: "Jalal Uddin Ahmed Foundation School and College" },
{ eiin: "105597", name: "Debiddar Rewaz Uddin Sarkari Uchch Biddaloy" },
{ eiin: "105609", name: "Nabiabad Uccho Biddaloy" },
{ eiin: "106010", name: "Paramtala Shabtharkhan Uccho Biddaloy" },
{ eiin: "106009", name: "Gangerkut Uchch Biddaloy" },
{ eiin: "104280", name: "Hatetkhari School and College" },
{ eiin: "104216", name: "Nurul Islam Pouro Balika Uccho Biddaloy" },
{ eiin: "104223", name: "Hasna Hena Balika Uccho Biddaloy" },
{ eiin: "104713", name: "Arfa Karim Uccho Biddaloy" },
{ eiin: "104607", name: "Aburhat Uccho Biddaloy" },
{ eiin: "106867", name: "Dalal Bazaar Fatema Balika Uccho Biddaloy" },
{ eiin: "106870", name: "Nandi Gram Uccho Biddaloy" },
{ eiin: "108941", name: "Bhadun Bohumukhi Uccho Biddaloy" },
{ eiin: "109578", name: "Rajapur Adarsha Uccho Biddaloy" },
{ eiin: "109557", name: "Mandra Radhaganj United Institution" },
{ eiin: "109675", name: "Tripalli Sk. Abu Naser Maddhomik Biddaloy" },
{ eiin: "109668", name: "Banchria Senerchar Uccho Biddaloy" },
{ eiin: "109662", name: "Dumuria Bohumukhi Maddhomik Biddaloy" },
{ eiin: "108277", name: "Matijheel Ideal School and College" },
{ eiin: "108323", name: "Kamal Ahmed Majumder School and College" },
{ eiin: "108055", name: "Hazi Abdul Awal Uccho Biddaloy" },
{ eiin: "108073", name: "Orient Textile Mills Uccho Biddaloy" },
{ eiin: "112453", name: "Kurerpara Uccho Biddaloy" },
{ eiin: "100759", name: "A.R.S Balika Maddhomik Biddaloy" },
{ eiin: "100778", name: "Hijaltala Maddhomik Biddaloy" },
{ eiin: "100763", name: "Hogla Maddhomik Biddaloy" },
{ eiin: "100764", name: "Kagashura Maddhomik Biddaloy" },
{ eiin: "100776", name: "Singherkathi Maddhomik Biddaloy" },
{ eiin: "109897", name: "Baruyamari Zahura Khatun Uccho Biddaloy" },
{ eiin: "113112", name: "Shyampur Union Uccho Biddaloy" },
{ eiin: "111774", name: "Ishsharganj Bishweshwari Pilot Uccho Biddaloy" },
{ eiin: "111263", name: "Rajoi Uccho Biddaloy" },
{ eiin: "111289", name: "Shaheed Nazim Uddin Uccho Biddaloy" },
{ eiin: "111299", name: "Palgaon Uccho Biddaloy" },
{ eiin: "111297", name: "Sayera Safayet School and College" },
{ eiin: "111874", name: "Mirkandapara Uccho Biddaloy" },
{ eiin: "111883", name: "Sirta Uccho Biddaloy" },
{ eiin: "121111", name: "Dariapur Amanulla Uccho Biddaloy" },
{ eiin: "127834", name: "Baroalampur Uccho Biddaloy" },
{ eiin: "127446", name: "Bir Muktijoddha Tayebur Rahman High School" },
{ eiin: "124636", name: "Tithalitala Uccho Biddaloy" },
{ eiin: "124618", name: "Kansat Uccho Biddaloy" },
{ eiin: "124638", name: "Kamalpur Uccho Biddaloy" },
{ eiin: "124751", name: "Chackkirti School and College" },
{ eiin: "124668", name: "Ranibari Balika Uccho Biddaloy" },
{ eiin: "124168", name: "Peerganj Uccho Biddaloy" },
{ eiin: "130937", name: "Buri Battola Balika Uccho Biddaloy" },
{ eiin: "117777", name: "Chourhas Mukul Sangha Maddhomik Biddaloy" },
{ eiin: "117764", name: "Uzangram Maddhomik Biddaloy" },
{ eiin: "114461", name: "Jhauthia Baazar Uccho Biddaloy" },
{ eiin: "138288", name: "Kushtia Calectorate School and College" },
{ eiin: "116171", name: "Muragachha Maddhomik Biddaloy" },
{ eiin: "116314", name: "Nehalpur School and College" },
{ eiin: "136840", name: "Jessore Collectorate School" },
{ eiin: "115964", name: "Police Line Maddhomik Biddaloy, Jessore" },
{ eiin: "116034", name: "Daitala Adarsha Maddhomik Biddaloy" },
{ eiin: "115967", name: "Abdul Bari Bahumukhi Maddhomik Biddaloy" },
{ eiin: "116036", name: "CAGM Maddhomik Biddaloy" },
{ eiin: "106072", name: "Baira Mohammad Arif School and College" },
{ eiin: "104287", name: "Al-Zaber Institute" },
{ eiin: "104501", name: "Bangladesh Railway Station Colony" },
{ eiin: "104733", name: "Dakshin Bhurshi Uccho Biddaloy" },
{ eiin: "104724", name: "Kortala Belkhain Mahabodhi Uccho Biddaloy" },
{ eiin: "104631", name: "Mazharul Haque Uccho Biddaloy" },
{ eiin: "106910", name: "Mandari Bohumukhi Uccho Biddaloy" },
{ eiin: "108967", name: "Gachha UcchoBiddaloy" },
{ eiin: "108978", name: "Harbaid School and College" },
{ eiin: "108953", name: "Bangandhu Sheikh Mujibur Rahman Krishi Biswa Biddaloy School" },
{ eiin: "109546", name: "Purba Kotalipara Union Uccho Biddaloy" },
{ eiin: "109562", name: "Neyarbari Bohumukhi Uccho Biddaloy" },
{ eiin: "109550", name: "Binoy Krishna Adarsha Uccho Biddaloy" },
{ eiin: "109555", name: "Talimpur Telihati Uccho Biddaloy" },
{ eiin: "109659", name: "Nilfa Boyra Uccho Biddaloy" },
{ eiin: "109664", name: "Kushali Islamia Uccho Biddaloy" },
{ eiin: "108191", name: "M D C Model Institute" },
{ eiin: "108044", name: "Halim Foundation Model High School" },
{ eiin: "108181", name: "Monipur Uccho Biddaloy and College (Shewrapara Branch)" },
{ eiin: "108242", name: "Agargaon Adarsha Uccho Biddaloy" },
{ eiin: "134173", name: "Ramkrishna Mission Uccho Biddaloy" },
{ eiin: "113114", name: "Magan Uccho Biddaloy" },
{ eiin: "113124", name: "Palgaon Adarsha Uccho Biddaloy" },
{ eiin: "130683", name: "Vati Bangla Uccho Biddaloy" },
{ eiin: "113121", name: "Jenpur Uccho Biddaloy" },
{ eiin: "113115", name: "Khanbahadur Kabir Uddin Khan Uccho Biddaloy" },
{ eiin: "111784", name: "Maijbagh Pachhpara Uccho Biddaloy" },
{ eiin: "111772", name: "Modhupur Bahumukhi Uccho Biddaloy" },
{ eiin: "111824", name: "Ishwarganj Balika Biddaloy and College" },
{ eiin: "111778", name: "Borohit Uccho Biddaloy" },
{ eiin: "111777", name: "Atarbari M C Uccho Biddaloy" },
{ eiin: "111301", name: "Goari Vawyalia Baju Balika Uccho Biddaloy" },
{ eiin: "111832", name: "Muslim Uccho Biddaloy" },
{ eiin: "111884", name: "Patgudam Uccho Biddaloy" },
{ eiin: "111878", name: "Haji Jalal Uddin Uccho Biddaloy" },
{ eiin: "111838", name: "Sunflower Ideal High School" },
{ eiin: "127787", name: "Vendabari Bahumukhi Uccho Biddaloy" },
{ eiin: "127849", name: "Iklimpur Uccho Biddaloy" },
{ eiin: "127846", name: "Kumedpur Uccho Biddaloy" },
{ eiin: "127810", name: "Haripur Di-Mukhi Uccho Biddaloy" },
{ eiin: "124613", name: "Manakasha Girls School" },
{ eiin: "124630", name: "Kansat U.&M.R.M. Balika Uccho Biddaloy" },
{ eiin: "124617", name: "Dadanchalk Girls School" },
{ eiin: "124133", name: "Bonolata Balika Uccho Biddaloy" },
{ eiin: "124138", name: "Green Academy Uccho Biddaloy" },
{ eiin: "124171", name: "Nayapara Usman Gani Balika Biddaloy" },
{ eiin: "124288", name: "Nalbata Uccho Biddaloy" },
{ eiin: "124256", name: "Sherkol Samzan Ali Uccho Biddaloy" },
{ eiin: "127026", name: "Riverview Collectorate School" },
{ eiin: "117741", name: "Kandapadia Maddhomik Biddaloy" },
{ eiin: "115981", name: "Baje Durgapur Anjuman Maddhomik Biddaloy" },
{ eiin: "104239", name: "Potenga High School" },
{ eiin: "104275", name: "Collegiate School" },
{ eiin: "104735", name: "S.A Nur High School" },
{ eiin: "104747", name: "Maliara Mahira Hikhain Uccho Biddaloy" },
{ eiin: "106904", name: "Laxmipur Balika Biddaniketan" },
{ eiin: "109572", name: "Kandi Adarsha Maddhomik Biddaloy" },
{ eiin: "109666", name: "Saptapalli Zoariya Uccho Biddaloy and College" },
{ eiin: "107966", name: "Lake Circus Balika Uccho Biddaloy" },
{ eiin: "130866", name: "Shyamali Public School and College" },
{ eiin: "108080", name: "Batali Siraj Uddin Ahmmed Uccho Biddaloy" },
{ eiin: "108069", name: "Kolatiya Uccho Biddaloy" },
{ eiin: "108090", name: "Zinzira Peer Mohammad Pilot Balika Uccho Biddaloy" },
{ eiin: "109902", name: "Bharuakhali M N A Uccho Biddaloy" },
{ eiin: "111771", name: "Kumaruli Uccho Biddaloy" },
{ eiin: "127804", name: "Shanerhat De-Mukhi Uccho Biddaloy" },
{ eiin: "127829", name: "Chetana Para Uccho Biddaloy" },
{ eiin: "130420", name: "Rajargaon Uccho Biddaloy" },
{ eiin: "115984", name: "Jangal Badhal Maddhomik Biddaloy" },
{ eiin: "116012", name: "Danbir Haji Mohammad Mahasin Maddhomik Biddaloy" },
{ eiin: "104664", name: "Garibe Newaz Uccho Biddaloy" },
{ eiin: "104604", name: "Korer Hat K. M Uccho Biddaloy" },
{ eiin: "108970", name: "Shaheed Smrity Uccho Biddaloy" },
{ eiin: "109663", name: "Gopalpur Panchapalli Uccho Biddaloy" },
{ eiin: "108366", name: "Shantibagh Uccho Biddaloy" },
{ eiin: "100745", name: "Nuria Maddhomik Biddaloy" },
{ eiin: "100786", name: "P.R.C Maddhomik Biddaloy" },
{ eiin: "109878", name: "Jhawla Gopalpur Bohumukhi Uccho Biddaloy" },
{ eiin: "113107", name: "Mahanganj Pilot Sarkari Uccho Biddaloy" },
{ eiin: "111887", name: "Renesa Balika Uccho Biddaloy" },
{ eiin: "111852", name: "Ashtadhar Bahumukhi Uccho Biddaloy" },
{ eiin: "121105", name: "Tulsighat kashinath Uccho Biddaloy" },
{ eiin: "131077", name: "Sadar Upazila Model School and College" },
{ eiin: "121191", name: "Asaduzzaman Girls High School and College" },
{ eiin: "127844", name: "Laldighi Mela Adarsha Uccho Biddaloy" },
{ eiin: "127785", name: "Raypur Uccho Biddaloy" },
{ eiin: "124615", name: "Shibganj Balika Uccho Biddaloy" },
{ eiin: "124625", name: "Binadpur Uccho Biddaloy" },
{ eiin: "124142", name: "Nabobidhan Uccho Balika Biddaloy" },
{ eiin: "124281", name: "Durgapur Di-Mukhi Uccho Biddaloy" },
{ eiin: "116315", name: "Palashi Maddhomik Biddaloy" },
{ eiin: "116119", name: "Manirampur Sarkari Pilot Uccho Biddaloy" },
{ eiin: "104519", name: "Chattogram Sarkari High School" },
{ eiin: "104738", name: "Muzzaforabad Balika Uccho Biddaloy" },
{ eiin: "104599", name: "Zoarganj Adarsha Uccho Biddaloy" },
{ eiin: "104407", name: "Fateyabad Adarsha Uccho Biddaloy" },
{ eiin: "104435", name: "BCSIR Laboratory Uccho Biddaloy" },
{ eiin: "106877", name: "Radhapur Uccho Biddaloy" },
{ eiin: "108166", name: "Natun Paltan Line Uccho Maddhomik Biddaloy" },
{ eiin: "130864", name: "Royal Academy" },
{ eiin: "108054", name: "Wazuddin Uccho Biddaloy" },
{ eiin: "108096", name: "Jazira Uccho Biddaloy" },
{ eiin: "108021", name: "Satarkul School and College" },
{ eiin: "112417", name: "Jaygabinda High School" },
{ eiin: "112413", name: "Isthair Rabeya Hosen Uccho Biddaloy" },
{ eiin: "109877", name: "Bangladesh Uccho Biddaloy" },
{ eiin: "111358", name: "Uthura Uccho Biddaloy o College" },
{ eiin: "111264", name: "Dakatia Shaheed Muktijoddha Uccho Biddaloy" },
{ eiin: "117762", name: "Khejurtala Patikabari Maddhomik Biddaloy" },
{ eiin: "116218", name: "Moshimnagar School and College" },
{ eiin: "115963", name: "Natun Khayertala Maddhomik Biddaloy" },
{ eiin: "105998", name: "Companiganj Badiul Alam Uccho Biddaloy" },
{ eiin: "104282", name: "Barik Mia Bahumukhi Uccho Biddaloy" },
{ eiin: "104491", name: "Kazem Ali School and College" },
{ eiin: "104691", name: "Nasirabad Sarkari Balak Uccho Biddaloy" },
{ eiin: "104693", name: "Chattogram Sarkari Balika Uccho Biddaloy" },
{ eiin: "104244", name: "Halishahar Meher Afzal Uccho Biddaloy" },
{ eiin: "104785", name: "Mansa School and College" },
{ eiin: "109547", name: "Uttar Kotalipara Rammohan" },
{ eiin: "109551", name: "Narikelbari Uccho Biddaloy" },
{ eiin: "109669", name: "Baladanga S M Musa Maddhomik Biddaloy" },
{ eiin: "107968", name: "Rayer Bazar Uccho Biddaloy" },
{ eiin: "108078", name: "Parzoara Brahman Gaon Uccho Biddaloy" },
{ eiin: "108168", name: "Pragoti Uccho Biddaloy" },
{ eiin: "108061", name: "Khilgaon Govt. Colony Uccho Maddhomik Biddaloy" },
{ eiin: "109917", name: "Meshta Uccho Biddaloy" },
{ eiin: "121101", name: "Gaibandha Sarkari Balok Uccho Biddaloy" },
{ eiin: "127501", name: "Police Line School and College" },
{ eiin: "124622", name: "Humayun Reza Uccho Biddaloy" },
{ eiin: "124663", name: "Nayalbhanga Balika Uccho Biddaloy" },
{ eiin: "124639", name: "Daipukuria U.C.Uccho Biddaloy" },
{ eiin: "124672", name: "Baghbari Uccho Biddaloy" },
{ eiin: "124134", name: "Sher-e-Bangla Uccho Biddaloy" },
{ eiin: "124286", name: "Alhaj Abdur Rahim Uccho Biddaloy" },
{ eiin: "124268", name: "Zoramollika Ninggain Uccho Biddaloy" },
{ eiin: "124264", name: "Beloya Uccho Biddaloy" },
{ eiin: "127027", name: "Rajshahi Court Academy" },
{ eiin: "130424", name: "Airport Uccho Biddaloy" },
{ eiin: "130405", name: "The Aid Ed High School" },
{ eiin: "130398", name: "Raja G C High School" },
{ eiin: "104712", name: "Eaqub Dandi Huline Perul High School" },
{ eiin: "104410", name: "K.M. Nazu Mia Uccho Biddaloy" },
{ eiin: "104398", name: "Uttar Madarsha Uccho Biddaloy" },
{ eiin: "109575", name: "Porsair Tripolli Uccho Biddaloy" },
{ eiin: "109673", name: "Khan Saheb Shekh. Mosharraf Hossain School and College" },
{ eiin: "109661", name: "Banhi Munsipura Uccho Biddaloy" },
{ eiin: "130882", name: "Mirpur Adarsha Biddaniketan" },
{ eiin: "108097", name: "Aymana Khatun Balika Uccho Biddaloy" },
{ eiin: "108345", name: "Nazrul Shikkhalay" },
{ eiin: "107885", name: "Matuail Adarsha Uccho Biddaloy" },
{ eiin: "124647", name: "Dhobra Anak Uccho Biddaloy" },
{ eiin: "124627", name: "Shahbazpur U.C.Uccho Biddaloy" },
{ eiin: "124172", name: "Ponditgram Uccho Biddaloy" },
{ eiin: "130397", name: "Model High School" },
{ eiin: "117748", name: "Adarsha Maddhomik Biddaloy" },
{ eiin: "117774", name: "Barokhada Maddhomik Biddaloy" },
{ eiin: "116205", name: "Khatura-Modhupur-Kayemkola Maddhomik Biddaloy" },
{ eiin: "116123", name: "Gopalpur School and College" },
{ eiin: "115973", name: "Abdus Samad Memorial Academy" },
{ eiin: "115982", name: "Chhatiyantala Churamankati Maddhomik Biddaloy" },
{ eiin: "116024", name: "Mominnagar Maddhomik Biddaloy" },
{ eiin: "106003", name: "Shreekail K K Uccho Biddaloy" },
{ eiin: "104294", name: "Bangladesh Bank Colony Uccho Biddaloy" },
{ eiin: "104610", name: "Mahjan Hat Fazlur Rahman School and College" },
{ eiin: "106898", name: "Laxmipur Collegiate Uccho Biddaloy" },
{ eiin: "108982", name: "Basan Tayezuddin Uccho Biddaloy" },
{ eiin: "108375", name: "Ali Ahmad School and College" },
{ eiin: "108221", name: "Mirpur Girls Ideal Laboratory Institute" },
{ eiin: "112483", name: "Siddhirganj Reboti Mohon Uccho Biddaloy" },
{ eiin: "109869", name: "Jamalpur Sarkari Balika Uccho Biddaloy" },
{ eiin: "109910", name: "Piyarpur Shaheed Khayer Balika Uccho Biddaloy" },
{ eiin: "111776", name: "Roybazaar Balika Uccho Biddaloy" },
{ eiin: "111285", name: "Goyari Vowyalia Bazaar Uccho Biddaloy" },
{ eiin: "111271", name: "Narangi Uccho Biddaloy" },
{ eiin: "111274", name: "Kachina Uccho Biddaloy" },
{ eiin: "121139", name: "Ballamjhara Balika Uccho Biddaloy" },
{ eiin: "124136", name: "Banbelghoria Shaheed Rezaun-Nabi Uccho Biddaloy" },
{ eiin: "124157", name: "Hazratpur Bohumukhi Uccho Biddaloy and College" },
{ eiin: "124285", name: "Bingram Uccho Biddaloy" },
{ eiin: "130992", name: "Bishnupur Italy Model High School" },
{ eiin: "126455", name: "Sarkari P N Balika Uccho Biddaloy" },
{ eiin: "130402", name: "Maynunnesa Balika Uccho Biddaloy" },
{ eiin: "116118", name: "Monirampur Sarkari Balika Uccho Biddaloy" },
{ eiin: "104472", name: "Kalarpole High School" },
{ eiin: "108074", name: "Natun Bokter Char School and College" },
{ eiin: "124202", name: "Chhatni Thiar Banika Uccho Biddaloy" },
{ eiin: "130412", name: "Syed Hatem Ali Uccho Biddaloy" },
{ eiin: "117759", name: "Kushtia Sarkari Balika Uccho Biddaloy" },
{ eiin: "117773", name: "Hari Narayanpur Balika Uccho Biddaloy" },
{ eiin: "105997", name: "Muradnagar Nurunnahar Balika Uccho Biddaloy" },
{ eiin: "109658", name: "G T Sarkari Uccho Biddaloy" },
{ eiin: "108094", name: "Shuvadhya Uccho Biddaloy" },
{ eiin: "108075", name: "Teghoria Uccho Biddaloy" },
{ eiin: "108233", name: "Ali Hosen Girls High School" },
{ eiin: "113118", name: "Mahanganj Adarsha Uccho Biddaloy" },
{ eiin: "131017", name: "Siddique Memorial School and College" },
{ eiin: "106899", name: "Laxmipur Sarkari Balika Uccho Biddaloy" },
{ eiin: "108164", name: "Agrani School and College" },
{ eiin: "109938", name: "Hazrat Shah Jamal (Rh) Uccho Biddaloy" },
{ eiin: "111357", name: "Dhalia Bahuli Uccho Maddhomik Biddaloy (School and College)" },
{ eiin: "121113", name: "Gaibandha N.H Modern Uccho Biddaloy" },
{ eiin: "121102", name: "Gaibandha Sarkari Balika Uccho Biddaloy" },
{ eiin: "115962", name: "Sarkari Balika Uccho Biddaloy, Jessore" },
{ eiin: "104728", name: "Jangalkhain Uccho Biddaloy" },
{ eiin: "104596", name: "Mirsarai Pilot Uccho Biddaloy" },
{ eiin: "108227", name: "Lalmatia Girls High School" },
{ eiin: "108139", name: "Ahmed Bawani Academy School and College" },
{ eiin: "112421", name: "Bibi Mariyam Balika Uccho Biddaloy" },
{ eiin: "127374", name: "Shishu Niketan" },
{ eiin: "126773", name: "Rajshahi Bishwa Biddaloy School" },
{ eiin: "100741", name: "Brajamohan Biddaloy" },
{ eiin: "127786", name: "Peerganj Sarkari Uccho Biddaloy" },
{ eiin: "104403", name: "Hathajari Balika Uccho Biddaloy" },
{ eiin: "107821", name: "Rowshan Ara Uccho Balika Biddaloy" },
{ eiin: "105598", name: "Gangamandal Raj Institute" },
{ eiin: "112423", name: "Adarsha School" },
{ eiin: "127029", name: "Rajshahi Sarkari Balika Uccho Biddaloy" },
{ eiin: "130399", name: "Sarkari Agragami Balika Uccho Biddaloy O College" },
{ eiin: "108077", name: "Kobi Nazrul Uccho Biddaloy" },
{ eiin: "112440", name: "Pagla Uccho Biddaloy" },
{ eiin: "130400", name: "Sylhet Sarkari Pilot Uccho Biddaloy" },
{ eiin: "130408", name: "Police Line Uccho Biddaloy" },
{ eiin: "112429", name: "Deobhog Haji Uzir Ali Uccho Biddaloy" },
{ eiin: "135676", name: "Sukhdebpur Baniahari SESDP Model Uccho Biddaloy" },
{ eiin: "124163", name: "Chandrokola S.I High School" },
{ eiin: "126450", name: "B B Hinthu Academy" },
{ eiin: "127366", name: "Rangpur High School" },
{ eiin: "126454", name: "Sarkari Siroil Uccho Biddaloy" },
{ eiin: "126449", name: "Rajshahi Bohumukhi Balika Uccho Biddaloy" },
{ eiin: "105596", name: "Debiddar Mafizuddin Ahmmed Pilot Balika Uchch Biddaloy" },
{ eiin: "105584", name: "Khalilpur Uccho Biddaloy" },
{ eiin: "104718", name: "Abdus Sobhan Rahat Ali Uccho Biddaloy" },
{ eiin: "113111", name: "Shaheed Smrity Uccho Biddaloy" },
{ eiin: "127854", name: "Bangabandhu Memorial Bahumukhi Uccho Biddaloy" },
{ eiin: "127364", name: "Rangpur Keramatia Uccho Biddaloy" },
{ eiin: "108267", name: "Motijheel Colony Uccho Biddaloy" },
{ eiin: "105999", name: "D R Sarkari Uchch Biddaloy" },
{ eiin: "109568", name: "Kotali para Shahana Rashid Balika Uccho Biddaloy" },
{ eiin: "108173", name: "Model Academy" },
{ eiin: "108264", name: "Mohammadpur Model School and College" },
{ eiin: "108362", name: "University Laboratory School and College" },
{ eiin: "111262", name: "Bharadoba Uccho Biddaloy" },
{ eiin: "107850", name: "Cantt. Shahid Ramijuddin Uccho Biddaloy" },
{ eiin: "100739", name: "Udayan Maddhomik Biddaloy" },
{ eiin: "100757", name: "Barishal Sarkari Balika Uccho Biddaloy" },
{ eiin: "117782", name: "Lahini Maddhomik Biddaloy" },
{ eiin: "127504", name: "Lalkuti Balika Uccho Biddaloy and MohaBiddaloy" },
{ eiin: "127024", name: "Government. Laboratory High School" },
{ eiin: "108379", name: "Dakshin Banashree Model High School and College" },
{ eiin: "111278", name: "Valuka Sarkari Balika Uccho Biddaloy" },
{ eiin: "105668", name: "Duariya A G Model Academy" },
{ eiin: "112418", name: "Sayedpur Bangabandhu Uccho Biddaloy" },
{ eiin: "124317", name: "Singra Damdama Pilot School and College" },
{ eiin: "104786", name: "Shavanthandi Uccho Biddaloy" },
{ eiin: "132091", name: "Model School and College" },
{ eiin: "126445", name: "Cantonment Board School and College" },
{ eiin: "135189", name: "Bithyaniketan Uccho Biddaloy" },
{ eiin: "111834", name: "Premier Ideal High School" },
{ eiin: "130458", name: "Amborkhana Balika School and College" },
{ eiin: "108580", name: "Matijheeel Sarkari Balika Uccho Biddaloy" },
{ eiin: "108076", name: "Shakta Uccho Biddaloy" },
{ eiin: "132107", name: "Mohammadpur Preparatory Uccho Maddhomik Biddaloy" },
{ eiin: "108258", name: "Residential Model School and College" },
{ eiin: "108961", name: "Kamiz Uddin Chowdhury Uccho Biddaloy and College" },
{ eiin: "108968", name: "Konabari M.A Kuddus Uccho Biddaloy" },
{ eiin: "108976", name: "Kashimpur Uccho Biddaloy" },
{ eiin: "127372", name: "Rangpur Zila School" },
{ eiin: "127380", name: "Rangpur Sarkari Balika Uccho Biddaloy" },
{ eiin: "127392", name: "Haridebpur Uccho Biddaloy" },
{ eiin: "127393", name: "Manohar Uccho Biddaloy" },
{ eiin: "109049", name: "Mazida Sarkari Uccho Biddaloy" },
{ eiin: "108966", name: "Kamarjuri Yousuf Ali Uccho Biddaloy" },
{ eiin: "108012", name: "Rampura Ekramunnesa Uccho Biddaloy" },
{ eiin: "104609", name: "Kamar Ali Union Uccho Biddaloy" },
{ eiin: "108149", name: "Jamila Khatun Lalbagh Uccho Balika Biddaloy" },
{ eiin: "104600", name: "Abu Torab Uccho Biddaloy" },
{ eiin: "108188", name: "Mirpur Bangla School and College" },
{ eiin: "127382", name: "Mariam Nechha Balika Uccho Biddaloy" },

  ];

  useEffect(() => {
    if (submit && beneficiary.u_nm && beneficiary.beneficiaryId) {
      makeRequest();
    }
  }, [submit, beneficiary]);

  async function makeRequest() {
    try {
      const res = await axios.post(baseUrl + "/beneficiary/", {
        beneficiary: beneficiary,
        token: localStorage.getItem("token"),
      });

      if (res.status === 200) {
        handleEditModalClose();
        Swal.fire({
          text: "School Successfully Added",
          icon: "success",
          type: "success",
          timer: 3000,
          showConfirmButton: false,
        });
        getBeneficiaries();
      }
    } catch (error) {
      if (error.response && error.response.data.errorMessage) {
        swal({
          text: error.response.data.errorMessage,
          icon: "error",
          type: "error",
        });
      } else {
        swal({
          text: "An error occurred. Please try again.",
          icon: "error",
          type: "error",
        });
      }
    }
    setSubmit(false);
  }

  async function addBeneficiary(e) {
    e.preventDefault();

    // Appending 'L' to u_nm and 'P' to f_nm before appending the beneficiaryId (eiin)
    setBeneficiary((prevState) => ({
      ...prevState,
      u_nm: `${prevState.beneficiaryId}-L${prevState.u_nm}`,
      f_nm: `${prevState.beneficiaryId}-P${prevState.f_nm}`,
    }));

    setSubmit(true);
  }

  function update(event) {
    let { name, value } = event.target;
    if (value === null) {
      value = "";
    }
    setBeneficiary((beneficiary) => {
      return { ...beneficiary, [name]: value };
    });
  }

  function checkNumber(e) {
    if (isNaN(e.target.value)) {
      swal("Oops!", "Please enter a number", "error");
    }
  }

  return (
    <Dialog
      open={isEditModalOpen}
      onClose={handleEditModalClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
      // scroll="false" // This will disable the scroll

      style={{ zIndex: 1300 }}
    >
      <DialogContent style={{  width: "400px" }}>
        <DialogTitle id="alert-dialog-title">
          <span style={{ color: "#138D75" }}>
            {" "}
            <b> Add School </b>{" "}
          </span>
        </DialogTitle>
        <br />

        {/* <TextField
          id="standard-basic"
          type="text"
          autoComplete="off"
          name="beneficiaryId"
          value={beneficiary.beneficiaryId}
          onChange={update}
          onBlur={checkNumber}
          placeholder="School EIIN"
          required
          pattern="[0-9]*"
          fullWidth
        /> */}

        <Autocomplete
          id="eiin-combo-box"
          options={schools}
          getOptionLabel={(option) => option.eiin}
          inputValue={eiinInput}
          onInputChange={(event, newInputValue) => {
            setEiinInput(newInputValue);
            if (newInputValue === "") {
              setNameInput("");
              setBeneficiary({});
              return;
            }
            const selectedSchool = schools.find(
              (school) => school.eiin === newInputValue
            );
            if (selectedSchool) {
              setBeneficiary((prevState) => ({
                ...prevState,
                beneficiaryId: selectedSchool.eiin,
                name: selectedSchool.name,
              }));
              setNameInput(selectedSchool.name);
            }
          }}
          filterOptions={(options, params) => {
            if (params.inputValue === "") {
              return [];
            }
            const filtered = options.filter((option) =>
              option.eiin.includes(params.inputValue)
            );
            return filtered;
          }}
          renderInput={(params) => (
            <TextField {...params} label="School EIIN" variant="outlined" />
          )}
          PopperComponent={({ children, ...props }) => (
            <Popper {...props} style={{ zIndex: 2000 }}>
              {children}
            </Popper>
          )}
        />

        <br />

        <Autocomplete
          id="name-combo-box"
          options={schools}
          getOptionLabel={(option) => option.name}
          inputValue={nameInput}
          onInputChange={(event, newInputValue) => {
            setNameInput(newInputValue);
            if (newInputValue === "") {
              setEiinInput("");
              setBeneficiary({});
              return;
            }
            const selectedSchool = schools.find(
              (school) =>
                school.name.toLowerCase() === newInputValue.toLowerCase()
            );
            if (selectedSchool) {
              setBeneficiary((prevState) => ({
                ...prevState,
                beneficiaryId: selectedSchool.eiin,
                name: selectedSchool.name,
              }));
              setEiinInput(selectedSchool.eiin);
            }
          }}
          filterOptions={(options, params) => {
            if (params.inputValue === "") {
              return [];
            }
            const filtered = options.filter((option) =>
              option.name
                .toLowerCase()
                .includes(params.inputValue.toLowerCase())
            );
            return filtered;
          }}
          renderInput={(params) => (
            <TextField {...params} label="School Name" variant="outlined" />
          )}
          PopperComponent={({ children, ...props }) => (
            <Popper {...props} style={{ zIndex: 2000 }}>
              {children}
            </Popper>
          )}
        />

        <br />

        <TextField
          id="outlined-basic"
          type="text"
          autoComplete="off"
          name="u_nm"
          value={beneficiary.u_nm}
          onChange={update}
          placeholder="Lab Id "
          variant="outlined"
          fullWidth
        />
        <br />
        <br />
        <TextField
          id="outlined-basic"
          type="text"
          autoComplete="off"
          name="f_nm"
          value={beneficiary.f_nm}
          onChange={update}
          placeholder="PC ID"
          variant="outlined"
          fullWidth
        />
        <br />
      </DialogContent>
      <DialogActions style={{ paddingRight: "80px", paddingBottom: "50px" }}>
        <Button
          onClick={handleEditModalClose}
          color="primary"
          style={{ backgroundColor: "#34495E", color: "white" }}
        >
          Cancel
        </Button>
        <Button
          onClick={addBeneficiary}
          color="primary"
          autoFocus
          style={{ backgroundColor: "#138D75", color: "white" }}
        >
          Add School
        </Button>
      </DialogActions>
    </Dialog>
  );
}
