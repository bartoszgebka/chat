const loadComponents = async () => {
  await Promise.all([
    import("./pages/start/start.page"),
    import("./pages/chat/chat.page"),
    import("./pages/chat/components/header.component"),
    import("./pages/chat/components/message.component"),
    import("./pages/chat/components/messages.component"),
    import("./pages/chat/components/footer.component"),
    import("./pages/members/members.page"),
    import("./pages/members/components/member.component"),
  ]);
};

loadComponents();
