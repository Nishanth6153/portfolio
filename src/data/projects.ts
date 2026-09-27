import { Project } from '../types/portfolio';

export const projects: Project[] = [
  {
    id: 'cnc-scheduler',
    number: '01',
    title: 'Smart CNC Production Scheduler',
    subtitle: 'Industrial Automation & Dynamic Optimization',
    category: 'FULL-STACK & SYSTEMS',
    description:
      'A dynamic production scheduling and optimization system for CNC machine shops, automating job assignments, bottleneck reduction, and real-time shop floor synchronization.',
    longDescription:
      'Designed to replace inefficient manual whiteboard and spreadsheet dispatching in precision manufacturing environments. The platform integrates dynamic dispatch algorithms with a high-throughput FastAPI backend and Supabase data layer, containerized with Docker for reliable edge and cloud deployments.',
    technologies: ['React', 'TypeScript', 'FastAPI', 'Python', 'Supabase', 'Docker'],
    features: [
      'Automated job-to-machine dispatching algorithms based on tooling constraints and operator availability',
      'Real-time machine load visualization and dynamic Gantt scheduling dashboard',
      'FastAPI asynchronous REST endpoints for sub-50ms schedule recalculations',
      'Supabase relational schema with real-time change data capture for instant shop-floor updates',
      'Dockerized multi-stage container deployment for edge-capable shopfloor servers',
    ],
    metrics: [
      { label: 'Latency', value: '<50ms' },
      { label: 'Dispatch', value: 'Dynamic' },
      { label: 'Architecture', value: 'Containerized' },
    ],
    github: 'https://github.com/Nishanth6153',
    demo: undefined,
    sceneId: 'cnc',
    caseStudy: {
      challenge:
        'CNC machine shops often struggle with scheduling delays, idle spindles, and sudden job priority shifts that cause production bottlenecks and cascading order delays.',
      solution:
        'Built a centralized scheduling engine with real-time state synchronization, enabling automated job re-sequencing, setup time minimization, and live operator telemetry.',
      architecture: [
        'React + TypeScript single-page application with modular state dispatchers',
        'Python FastAPI asynchronous microservice for constraint-satisfaction scheduling',
        'Supabase PostgreSQL persistence layer with row-level security and WebSockets',
        'Docker container orchestration for reproducible cross-environment execution',
      ],
      outcomes: [
        'Deterministic job dispatching eliminating manual shop floor conflict',
        'Real-time transparency across machine states, tooling, and cycle completions',
        'Scalable microservice architecture capable of continuous throughput',
      ],
    },
  },
  {
    id: 'sustatio',
    number: '02',
    title: 'Sustatio — Smart Waste Management Platform',
    subtitle: 'Circular Economy & Resource Intelligence',
    category: 'WEB PLATFORM & SUSTAINABILITY',
    description:
      'A waste-management platform with smart segregation and circular-economy features. Presented at Smart India Hackathon 2025 and UDHAYAM ’26.',
    longDescription:
      'Sustatio addresses urban waste management and circular economy tracking through a streamlined web platform. It connects waste generators, recyclers, and municipal coordinators with live tracking, automated segregation categorization, and transparent sustainability accounting.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    features: [
      'Interactive waste segregation workflows with category guidance and disposal routing',
      'Live pickup request scheduling and logistics synchronization with Supabase backend',
      'Circular economy resource marketplace connecting recyclers with raw material sources',
      'Responsive, high-contrast dashboard built with Tailwind CSS for field workers and administrators',
      'Recognized and presented at national innovation forums including Smart India Hackathon 2025',
    ],
    metrics: [
      { label: 'Forums', value: 'SIH 2025' },
      { label: 'Showcase', value: 'UDHAYAM ’26' },
      { label: 'Stack', value: 'Modern Web' },
    ],
    github: 'https://github.com/Nishanth6153',
    demo: undefined,
    sceneId: 'sustatio',
    caseStudy: {
      challenge:
        'Unorganized municipal waste collection leads to high landfill contamination rates and untapped economic value in post-consumer recyclables.',
      solution:
        'Engineered an intuitive end-to-end platform facilitating structured segregation at source, scheduled pickups, and auditable recycling lifecycle records.',
      architecture: [
        'React 18 frontend with component-driven UI and responsive Tailwind styling',
        'Supabase Auth, PostgreSQL tables, and Realtime subscriptions for status updates',
        'Optimized client-side state handling for low-bandwidth mobile operations',
      ],
      outcomes: [
        'Shortlisted and presented at Smart India Hackathon 2025 and UDHAYAM ’26 national expo',
        'Streamlined multi-role user experience for households, collection agents, and recycling plants',
      ],
    },
  },
  {
    id: 'plant-disease-detection',
    number: '03',
    title: 'AI Plant Disease Detection',
    subtitle: 'Edge AI & On-Device Computer Vision',
    category: 'MOBILE & EMBEDDED AI',
    description:
      'An Android application that identifies plant diseases from leaf images in real time. The model runs fully on-device, making diagnosis fast and reliable even without an internet connection.',
    longDescription:
      'Empowers farmers and agriculturalists in rural areas with zero connectivity by executing quantized deep neural networks directly on Android hardware. Utilizes a fine-tuned MobileNetV2 architecture converted to TensorFlow Lite for ultra-fast local inference.',
    technologies: ['Kotlin', 'TensorFlow Lite', 'MobileNetV2', 'Android Studio'],
    features: [
      '100% offline inference capability with zero cloud dependencies or latency bottlenecks',
      'Quantized MobileNetV2 neural network optimized for mobile CPU and NNAPI hardware acceleration',
      'Real-time camera preview scanning with instant bounding box and disease label overlay',
      'Actionable treatment recommendations and preventative measures for detected plant pathogens',
      'Intuitive native Android user interface written cleanly in Kotlin',
    ],
    metrics: [
      { label: 'Inference', value: '100% Offline' },
      { label: 'Architecture', value: 'MobileNetV2' },
      { label: 'Confidence', value: '90–99%' },
    ],
    github: 'https://github.com/Nishanth6153',
    demo: undefined,
    sceneId: 'plant',
    caseStudy: {
      challenge:
        'Rural farmers often lack reliable internet connectivity, making cloud-based computer vision APIs unusable in remote agricultural fields during early crop infection stages.',
      solution:
        'Built a standalone native Android application that embeds an optimized TensorFlow Lite model directly on the handset, delivering instant disease classifications locally.',
      architecture: [
        'MobileNetV2 convolutional neural network trained on extensive agricultural datasets',
        'FP16/INT8 TensorFlow Lite post-training quantization for minimal APK footprint and high FPS',
        'Kotlin CameraX implementation feeding live frame buffers directly into TFLite Interpreter',
      ],
      outcomes: [
        'Instant sub-second disease classification directly in the field with 90-99% confidence',
        'Resilient architecture that operates anywhere without cellular reception or subscription costs',
      ],
    },
  },
  {
    id: 'performance-engineering',
    number: '04',
    title: 'Performance & Engineering',
    subtitle: 'System Observability, Telemetry & Scalability',
    category: 'INFRASTRUCTURE & RELIABILITY',
    description:
      'Comprehensive engineering discipline covering load testing, performance analysis, container orchestration, and real-time observability pipelines.',
    longDescription:
      'Engineering reliable, resilient software architectures by subjecting services to synthetic traffic profiles, analyzing latency percentiles (p95, p99), and configuring continuous metrics harvesting pipelines.',
    technologies: ['k6', 'Prometheus', 'Grafana', 'Docker', 'Load Testing', 'Performance Analysis', 'Scalability Testing'],
    features: [
      'Automated scenario-based stress and soak testing using k6 scriptable execution pipelines',
      'Metric aggregation and time-series scraping with Prometheus collectors',
      'Real-time visualization dashboards in Grafana monitoring throughput, error rates, and memory saturation',
      'Docker containerized benchmarking environments ensuring consistent test reproducibility',
      'Identification of database connection pool exhaustion, query bottlenecks, and API concurrency thresholds',
    ],
    metrics: [
      { label: 'Testing Tool', value: 'k6' },
      { label: 'Observability', value: 'Prometheus & Grafana' },
      { label: 'Environment', value: 'Dockerized' },
    ],
    github: 'https://github.com/Nishanth6153',
    demo: undefined,
    sceneId: 'perf',
    caseStudy: {
      challenge:
        'Web backends and APIs frequently degrade under unexpected traffic spikes due to unindexed queries, blocking I/O, or improper resource quotas.',
      solution:
        'Established structured performance benchmarking workflows using k6 for deterministic load injection, combined with Prometheus/Grafana observability to pinpoint degradation points.',
      architecture: [
        'k6 automated load-test scripts simulating concurrent user journeys and traffic ramps',
        'Prometheus scraping container and process metrics at high frequency',
        'Grafana dashboard panels tracking p50/p95/p99 response latency and system saturation',
        'Docker Compose networks mirroring production microservice topologies',
      ],
      outcomes: [
        'Systematic validation of throughput limits and concurrency boundaries',
        'Elimination of performance regressions prior to production release cycles',
      ],
    },
  },
];
