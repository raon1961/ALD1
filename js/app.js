const members = [
  { 
    id: 1, 
    name: "YOO KANG MIN", 
    profileImgs: [
      "images/mst1.jpeg", 
      "images/mst2.jpeg"
    ], 
    detailImg: "images/mst-pro1.jpeg", 
    bio: "사토가 생각한 사토의 이미지는 내 생각보다 귀여운 듯" 
  },
  { 
    id: 2, 
    name: "CHUEI LI YU", 
    profileImgs: [
      "images/mst3.jpeg", 
      "images/mst4.jpeg"
    ], 
    detailImg: "images/mst-pro2.jpeg", 
    bio: "사토가 연습하며 생긴 습관은 스트레칭, 표정연습, 연습일지 쓰기" 
  },
  { 
    id: 3, 
    name: "CHEN KAI WEN", 
    profileImgs: [
      "images/mst5.jpeg", 
      "images/mst6.jpeg"
    ], 
    detailImg: "images/mst-pro3.jpeg", 
    bio: "사토가 도전하고 싶은 무대 컨셉은 sexy 컨셉, 열정 컨셉, 귀여운 컨셉" 
  },
  { 
    id: 4, 
    name: "PARK DONG GYU", 
    profileImgs: [
      "images/mst7.jpeg", 
      "images/mst8.jpeg"
    ], 
    detailImg: "images/mst-pro4.jpeg", 
    bio: "사토의 최대 강점은 너무너무해피마사토" 
  },
  { 
    id: 5, 
    name: "KIM JUN MIN", 
    profileImgs: [
      "images/mst9.jpeg", 
      "images/mst10.jpeg"
    ], 
    detailImg: "images/mst-pro5.jpeg", 
    bio: "한순간도 놓치지 않고 무대 위에서 모든 걸 불태우겠습니다!" 
  },
  { 
    id: 6, 
    name: "JUN LEE JUNG", 
    profileImgs: [
      "images/mst11.jpeg", 
      "images/mst12.jpeg"
    ], 
    detailImg: "images/mst-pro6.jpeg", 
    bio: "과거 지원서 쓰던 사토에게 한마디 마사토 지금 많은 사람과 만나서 성장 할고 있어!! 너가 생각보다 알려준 사람도 응원해준 사람도 있어!" 
  },
  { 
    id: 7, 
    name: "KANG WOO JIN", 
    profileImgs: [
      "images/mst13.jpeg", 
      "images/mst14.jpeg"
    ], 
    detailImg: "images/mst-pro7.jpeg", 
    bio: "지금 사토에게 힘이 되는 한마디는 응원해주신 모든 사람 위해 끝까지 한게까지 열심히 노력하자!" 
  },
  { 
    id: 8, 
    name: "JANG HAN EUM", 
    profileImgs: [
      "images/mst15.jpeg", 
      "images/mst16.jpeg"
    ], 
    detailImg: "images/mst-pro8.jpeg", 
    bio: "미래 파이널을 앞둔 사토에게 한마디 그대로 데뷔하고 여러 사람한테 감사를 전달해야돼 잘 할 수 있어 마사토" 
  },
  { 
    id: 9, 
    name: "SEN", 
    profileImgs: [
      "images/mst17.jpeg", 
      "images/mst18.jpeg"
    ], 
    detailImg: "images/mst-pro9.jpeg", 
    bio: "모두의 심장이 뜨거워지도록 열정과 성실함을 보여드리겠습니다!" 
  }
   { 
    id: 10, 
    name: "KIN IN HU", 
    profileImgs: [
      "images/mst17.jpeg", 
      "images/mst18.jpeg"
    ], 
    detailImg: "images/mst-pro9.jpeg", 
    bio: "모두의 심장이 뜨거워지도록 열정과 성실함을 보여드리겠습니다!" 
  }
   { 
    id: 11, 
    name: "MASATO", 
    profileImgs: [
      "images/mst17.jpeg", 
      "images/mst18.jpeg"
    ], 
    detailImg: "images/mst-pro9.jpeg", 
    bio: "모두의 심장이 뜨거워지도록 열정과 성실함을 보여드리겠습니다!" 
  }
];

// 스크롤 등장 훅
function useScrollAnimation() {
  const [visible, setVisible] = React.useState(false);
  const ref = React.useRef();

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if(ref.current) observer.unobserve(ref.current); };
  }, []);

  return [ref, visible];
}

// 카드
function MemberCard({ member, onClick }) {
  const [ref, visible] = useScrollAnimation();
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (!member.profileImgs || member.profileImgs.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % member.profileImgs.length);
    }, 3000); // 3초마다 변경
    return () => clearInterval(interval);
  }, [member.profileImgs.length]);

  return React.createElement(
    "div",
    {
      ref: ref,
      className: `bg-white rounded-lg shadow-md p-4 sm:p-6 text-center cursor-pointer transform transition duration-500 ${
        visible ? "animate-fadeInUp" : "opacity-0"
      }`,
      onClick: () => onClick(member)
    },
    React.createElement("img", {
      src: member.profileImgs[index],
      alt: member.name,
      loading: "lazy",
      className: "w-52 h-72 mx-auto rounded-lg object-cover transition duration-700 ease-in-out"
    }),
    React.createElement("h2", {
      className: "text-lg sm:text-xl font-semibold mt-2",
      style: { fontFamily: "Sequel100Black, sans-serif" }
    }, member.name)
  );
}

// SNS 아이콘 섹션
function SocialSection() {
  const [ref, visible] = useScrollAnimation();
  return React.createElement(
    "div",
    { ref: ref, className: `mt-12 flex justify-center space-x-6 opacity-0 transform translate-y-10 transition duration-700 ${visible ? "opacity-100 translate-y-0" : ""}` },
    React.createElement("a", { href: "https://youtube.com/@boysplanet.official?si=uWoML6FSkZG1qDg1", target: "_blank", rel: "noopener noreferrer" },
      React.createElement("img", { src: "images/youtube.png", alt: "YouTube", className: "w-8 h-8 sm:w-10 sm:h-10 hover:scale-125 transition transform duration-300" })
    ),
    React.createElement("a", { href: "https://www.instagram.com/boysplanet.official?igsh=MXJpYzVjeGljdzVyeg==", target: "_blank", rel: "noopener noreferrer" },
      React.createElement("img", { src: "images/instagram.png", alt: "Instagram", className: "w-8 h-8 sm:w-10 sm:h-10 hover:scale-125 transition transform duration-300" })
    ),
    React.createElement("a", { href: "https://x.com/_mnetboysplanet?s=21", target: "_blank", rel: "noopener noreferrer" },
      React.createElement("img", { src: "images/x.png", alt: "X", className: "w-8 h-8 sm:w-10 sm:h-10 hover:scale-125 transition transform duration-300" })
    )
  );
}

// 메인 앱
function App() {
  const [selectedMember, setSelectedMember] = React.useState(null);
  const handleCloseModal = () => setSelectedMember(null);

  return React.createElement(
    "div",
    { className: "container mx-auto p-4" },

    // 제목 (왼쪽 상단 고정)
    React.createElement("h1", {
      className: "text-2xl sm:text-3xl font-bold mb-6 fixed top-4 left-4 z-50",
      style: { fontFamily: "Sequel100Black, sans-serif" }
    }, "F1are"),

    // 카드 그리드
    React.createElement(
      "div",
      { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16" },
      members.map(member =>
        React.createElement(MemberCard, { key: member.id, member: member, onClick: setSelectedMember })
      )
    ),

    React.createElement(SocialSection),

    // 모달
selectedMember &&
React.createElement("div", {
  className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
  onClick: handleCloseModal
},
  React.createElement("div", {
    className: "bg-white p-6 rounded-lg w-11/12 max-w-md relative animate-fadeInModal",
    onClick: e => e.stopPropagation()
  },
    React.createElement("button", { className: "absolute top-2 right-2 text-gray-500", onClick: handleCloseModal }, "X"),
    React.createElement("img", { src: selectedMember.detailImg, alt: selectedMember.name, className: "w-full h-72 mx-auto rounded-lg object-cover" }),
    React.createElement("h2", {
      className: "text-2xl sm:text-3xl font-bold mt-4 text-center",
      style: { fontFamily: "Sequel100Black, sans-serif" }
    }, selectedMember.name),
    React.createElement("p", { className: "mt-2 text-gray-600 text-center text-sm sm:text-base" }, selectedMember.bio)
  )
)
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
