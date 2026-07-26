interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Human-AI Alignment',
    description: 'Nghiên cứu và tổng hợp paper về căn chỉnh giữa mô hình AI và con người.',
  },
  {
    title: 'Machine Reasoning',
    description: 'Nghiên cứu và tổng hợp paper về khả năng suy luận của máy học.',
  },
  {
    title: 'Foundation Model Distillation',
    description: 'Nghiên cứu và tổng hợp paper về chưng cất tri thức cho foundation model.',
  },
  {
    title: 'Foundation Model Security',
    description: 'Nghiên cứu và tổng hợp paper về an toàn/bảo mật cho foundation model.',
  },
  {
    title: 'Continual Learning for Foundation Models',
    description: 'Nghiên cứu và tổng hợp paper về học liên tục cho foundation model.',
  },
  {
    title: 'Foundation Model for Robotics',
    description: 'Nghiên cứu và tổng hợp paper về ứng dụng foundation model trong robotics.',
  },
  {
    title: 'Efficient and Explainable Machine Learning',
    description: 'Nghiên cứu và tổng hợp paper về học máy hiệu quả và có thể giải thích.',
  },
  {
    title: 'Model Training and DL Theories',
    description: 'Nghiên cứu và tổng hợp paper về lý thuyết huấn luyện mô hình deep learning.',
  },
  {
    title: 'Diffusion and Flow Matching',
    description: 'Nghiên cứu và tổng hợp paper về diffusion model và flow matching.',
  },
]

export default projectsData
