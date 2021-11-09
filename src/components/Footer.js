var style = {
  backgroundColor: "lightblue",
  textAlign: "center",
  padding: "20px",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "60px",
  width: "100%",
};

var phantom = {
  display: "block",
  padding: "20px",
  height: "60px",
  width: "100%",
};

const Footer = () => {
  return (
    <div>
      <div style={phantom} />
      <div style={style}>CalBets™, 2021</div>
    </div>
  );
};

export { Footer };
