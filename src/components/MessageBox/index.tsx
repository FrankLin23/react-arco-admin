import { Badge, Trigger } from "@arco-design/web-react";

function DropContent() {
  return <div></div>;
}

function MessageBox({ children }) {
  return (
    <Trigger
      trigger="hover"
      popup={() => <DropContent />}
      position="br"
      unmountOnExit={false}
      popupAlign={{ bottom: 4 }}
    >
      <Badge count={9} dot>
        {children}
      </Badge>
    </Trigger>
  );
}

export default MessageBox;
