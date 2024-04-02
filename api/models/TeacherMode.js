const teacher = {
  teacherMode: process.env.TEACHERMODE,
  teacherPromptEnable: process.env.TEACHER_PROMPT_ENABLED,
  teacherPrompt: process.env.TEACHER_PROMPT,
};

function isTeacherMode() {
  return teacher.teacherMode;
}

function isTeacherPromptEnable() {
  return teacher.teacherPromptEnable;
}

async function addTeacherPrompt(prompt) {
  return prompt + teacher.teacherPrompt;
}

module.exports = {
  isTeacherMode,
  isTeacherPromptEnable,
  addTeacherPrompt,
};
