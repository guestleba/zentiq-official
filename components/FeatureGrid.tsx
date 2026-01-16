import { motion } from "framer-motion";
import { Shield, Zap, Globe, Lock, Layers, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Zero-Knowledge Proofs",
    description: "Mathematical privacy guarantees. Your transactions are verified without revealing sensitive data.",
    size: "large",
  },
  {
    icon: Zap,
    title: "Instant Settlement",
    description: "Sub-second finality with cutting-edge infrastructure.",
    metric: "12ms",
    metricLabel: "Average Latency",
    size: "medium",
  },
  {
    icon: Globe,
    title: "Global Compliance",
    description: "Built for institutional adoption across jurisdictions.",
    stat: "180+",
    statLabel: "Countries",
    size: "medium",
  },
  {
    icon: Lock,
    title: "Self-Custody",
    description: "Your keys, your assets. Non-custodial by design.",
    size: "small",
  },
  {
    icon: Layers,
    title: "Multi-Chain",
    description: "Seamless interoperability across networks.",
    size: "small",
  },
  {
    icon: BarChart3,
    title: "Institutional Grade",
    description: "Enterprise APIs and dedicated support for institutions.",
    size: "small",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export const FeatureGrid = () => {
  return (
    <section id="features" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 aurora-bg opacity-50" />
      
      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Built for the <span className="neon-text">Future</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Enterprise-grade infrastructure designed for privacy-first finance
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[minmax(200px,auto)]"
        >
          {/* Large Feature Card - Zero Knowledge */}
          <motion.div
            variants={itemVariants}
            whileHover={{ 
              y: -8,
              transition: { duration: 0.3 }
            }}
            className="glass-card p-8 md:col-span-2 md:row-span-2 group cursor-pointer"
          >
            <div className="h-full flex flex-col">
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <div className="absolute inset-0 w-16 h-16 rounded-2xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">{features[0].title}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed flex-grow">
                {features[0].description}
              </p>
              <div className="mt-8 pt-6 border-t border-glass-border/30">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm text-muted-foreground">Powered by zk-SNARKs</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Medium Feature Card - Instant Settlement */}
          <motion.div
            variants={itemVariants}
            whileHover={{ 
              y: -8,
              transition: { duration: 0.3 }
            }}
            className="glass-card p-6 md:col-span-2 lg:col-span-1 group cursor-pointer"
          >
            <div className="flex flex-col h-full">
              <div className="relative mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{features[1].title}</h3>
              <p className="text-muted-foreground text-sm flex-grow">{features[1].description}</p>
              <div className="mt-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold neon-text">{features[1].metric}</span>
                  <span className="text-xs text-muted-foreground">{features[1].metricLabel}</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "85%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Medium Feature Card - Global Compliance */}
          <motion.div
            variants={itemVariants}
            whileHover={{ 
              y: -8,
              transition: { duration: 0.3 }
            }}
            className="glass-card p-6 group cursor-pointer"
          >
            <div className="flex flex-col h-full">
              <div className="relative mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{features[2].title}</h3>
              <p className="text-muted-foreground text-sm flex-grow">{features[2].description}</p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-bold neon-text">{features[2].stat}</span>
                <span className="text-xs text-muted-foreground">{features[2].statLabel}</span>
              </div>
            </div>
          </motion.div>

          {/* Small Feature Cards */}
          {features.slice(3).map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              className="glass-card p-6 group cursor-pointer"
            >
              <div className="flex flex-col h-full">
                <div className="relative mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
