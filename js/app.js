// --- members 배열 (쉼표 누락 등 수정됨) ---
const members = [
  { 
    id: 1, 
    name: "LEE SANG WON", 
    profileImgs: [
      "images/lsw.webp"
    ], 
    detailImg: "images/lswp.webp", 
    bio: "작은 올림이라도 오래 남는 사람이 되고 싶습니다." 
  },
  { 
    id: 2, 
    name: "ZHOU AN XIN", 
    profileImgs: [
      "images/zax.webp", 
    ], 
    detailImg: "images/zaxp.webp", 
    bio: "더 열심히 할테니까 저와 함께 끝까지 가줘요!!" 
  },
  { 
    id: 3, 
    name: "HE XIN LONG", 
    profileImgs: [
      "images/hxl.wbep"
    ], 
    detailImg: "images/hxlp.webp", 
    bio: "아~~~~~~~~~~~~~~~~~음..." 
  },
  { 
    id: 4, 
    name: "KIM GEON WOO", 
    profileImgs: [
      "images/kgw.webp"
    ], 
    detailImg: "images/kgwp.webp", 
    bio: "저에게 온 이 기회를 절대 놓치지 않겠습니다." 
  },
  { 
    id: 5, 
    name: "ZHANG JIA HAO", 
    profileImgs: [
      "images/zjh.webp"
    ], 
    detailImg: "images/zjhp.webp", 
    bio: "안녕하세용~" 
  },
  { 
    id: 6, 
    name: "LEE LEO", 
    profileImgs: [
      "images/ll.webp"
    ], 
    detailImg: "images/llp.webp", 
    bio: "언제나 진정성 있는 모습을 보여드리는 사람이고 싶습니다." 
  },
  { 
    id: 7, 
    name: "CHUNG SANG HYEON", 
    profileImgs: [
      "images/csh.webp"
    ], 
    detailImg: "images/csh.webp", 
    bio: "여러분들의 최애가 되는 그날까지!!!" 
  },
  { 
    id: 8, 
    name: "KIM JUN SEO", 
    profileImgs: [
      "images/kjs.webp"
    ], 
    detailImg: "images/kjsp.webp", 
    bio: "제가 누구인지 확실히 보여드리겠습니다!" 
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
    React.createElement("a", { href: "https://m.youtube.com/@f1are11_11", target: "_blank", rel: "noopener noreferrer" },
      React.createElement("img", { src: "images/youtube.png", alt: "YouTube", className: "w-8 h-8 sm:w-10 sm:h-10 hover:scale-125 transition transform duration-300" })
    ),
    React.createElement("a", { href: "https://www.instagram.com/f1are11_official", target: "_blank", rel: "noopener noreferrer" },
      React.createElement("img", { src: "images/instagram.png", alt: "Instagram", className: "w-8 h-8 sm:w-10 sm:h-10 hover:scale-125 transition transform duration-300" })
    ),
    React.createElement("a", { href: "https://x.com/standbyf1are?s=21", target: "_blank", rel: "noopener noreferrer" },
      React.createElement("img", { src: "images/x.png", alt: "X", className: "w-8 h-8 sm:w-10 sm:h-10 hover:scale-125 transition transform duration-300" })
    ),
    React.createElement("a", { href: "https://www.tiktok.com/@f1are1171", target: "_blank", rel: "noopener noreferrer" },
      React.createElement("img", { src: "images/TikTok.png", alt: "TikTok", className: "w-8 h-8 sm:w-10 sm:h-10 hover:scale-125 transition transform duration-300" })
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
    }, "ALPHA DRIVE ONE"),

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
