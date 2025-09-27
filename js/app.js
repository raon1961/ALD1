// --- members 배열 (쉼표 누락 등 수정됨) ---
const members = [
  { 
    id: 1, 
    name: "YOO KANG MIN", 
    profileImgs: [
      "images/min.jpeg"
    ], 
    detailImg: "images/minp.jpeg", 
    bio: "행복하게 해드릴게요 ㅎㅎ" 
  },
  { 
    id: 2, 
    name: "CHUEI LI YU", 
    profileImgs: [
      "images/yu.jpeg", 
    ], 
    detailImg: "images/yup.jpeg", 
    bio: "베스트 초이스 리부초이 놓치지 마세요!" 
  },
  { 
    id: 3, 
    name: "CHEN KAI WEN", 
    profileImgs: [
      "images/wen.jpeg"
    ], 
    detailImg: "images/wenp.jpeg", 
    bio: "지금 입덕하면 찐 팬 가능!!" 
  },
  { 
    id: 4, 
    name: "PARK DONG GYU", 
    profileImgs: [
      "images/gyu.jpeg"
    ], 
    detailImg: "images/gyup.jpeg", 
    bio: "지금까지 연습했던 시간들을 플레어를 통해 보여드리겠습니다!" 
  },
  { 
    id: 5, 
    name: "KIM JUN MIN", 
    profileImgs: [
      "images/jay.jpeg"
    ], 
    detailImg: "images/jayp.jpeg", 
    bio: "즐기겠습니다~!" 
  },
  { 
    id: 6, 
    name: "JUN LEE JEONG", 
    profileImgs: [
      "images/jeong.jpeg"
    ], 
    detailImg: "images/jeongp.jpeg", 
    bio: "많은 응원과 사랑을 보내주세요!" 
  },
  { 
    id: 7, 
    name: "KANG WOO JIN", 
    profileImgs: [
      "images/jin.jpeg"
    ], 
    detailImg: "images/jinp.jpeg", 
    bio: "여러분들의 최애가 되는 그날까지!!!" 
  },
  { 
    id: 8, 
    name: "JANG HAN EUM", 
    profileImgs: [
      "images/eum.jpeg"
    ], 
    detailImg: "images/eump.jpeg", 
    bio: "제가 누구인지 확실히 보여드리겠습니다!" 
  },
  { 
    id: 9, 
    name: "SEN", 
    profileImgs: [
      "images/sen.jpeg"
    ], 
    detailImg: "images/senp.jpeg", 
    bio: "내 미소를 보고 너가 행복해졌으면 좋겠어! 사랑해! 다이스키~" 
  },
   { 
    id: 10, 
    name: "KIN IN HU", 
    profileImgs: [
      "images/hu.jpeg"
    ], 
    detailImg: "images/hup.jpeg", 
    bio: "지금은 부족할 수 있지만,끝까지 성장하는 모습으로 보답하겠습니다!" 
  },
   { 
    id: 11, 
    name: "MASATO", 
    profileImgs: [
      "images/to.jpeg"
    ], 
    detailImg: "images/top.jpeg", 
    bio: "모두의 심장이 뜨거워지도록 열정과 성실함을 보여드리겠습니다!" 
  }
];

// --- 스크롤 등장 훅 (observer 안전하게 정리) ---
function useScrollAnimation() {
  const [visible, setVisible] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, []);

  return [ref, visible];
}

// --- 카드 컴포넌트 ---
function MemberCard({ member, onClick }) {
  const [ref, visible] = useScrollAnimation();
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    // 안전하게 optional chaining 사용
    const imgsLength = member?.profileImgs?.length || 0;
    if (imgsLength === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % imgsLength);
    }, 3000);
    return () => clearInterval(interval);
  }, [member?.profileImgs?.length]);

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

// --- SNS 섹션 ---
function SocialSection() {
  const [ref, visible] = useScrollAnimation();
  return React.createElement(
    "div",
    { ref: ref, className: `mt-12 flex justify-center space-x-6 opacity-0 transform translate-y-10 transition duration-700 ${visible ? "opacity-100 translate-y-0" : ""}` },
    React.createElement("a", { href: "https://youtube.com/@boysplanet.official?si=uWoML6FSkZG1qDg1", target: "_blank", rel: "noopener noreferrer" },
      React.createElement("img", { src: "images/youtube.png", alt: "YouTube", className: "w-8 h-8 sm:w-10 sm:h-10 hover:scale-125 transition transform duration-300" })
    ),
    React.createElement("a", { href: "https://www.instagram.com/f1are11_official", target: "_blank", rel: "noopener noreferrer" },
      React.createElement("img", { src: "images/instagram.png", alt: "Instagram", className: "w-8 h-8 sm:w-10 sm:h-10 hover:scale-125 transition transform duration-300" })
    ),
    React.createElement("a", { href: "https://x.com/standbyf1are?s=21", target: "_blank", rel: "noopener noreferrer" },
      React.createElement("img", { src: "images/x.png", alt: "X", className: "w-8 h-8 sm:w-10 sm:h-10 hover:scale-125 transition transform duration-300" })
    )
  );
}

// --- App ---
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

    // SNS
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
