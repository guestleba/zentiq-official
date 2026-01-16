import { motion } from "framer-motion";
import { TrendingUp, Users, Activity, CheckCircle2 } from "lucide-react";

const metrics = [
  {
    icon: TrendingUp,
    label: "Total Value Locked",
    value: "$4.2M",
    change: "+12.4%",
  },
  {
    icon: Users,
    label: "Active Users",
    value: "2,847",
    change: "+8.2%",
  },
  {
    icon: Activity,
    label: "Transactions",
    value: "128K",
    change: "+24.1%",
  },
  {
    icon: CheckCircle2,
    label: "System Status",
    value: "Operational",
    status: "live",
  },
];

export const MetricsTicker = () => {
  return (
    <section className="relative py-8 overflow-hidden border-y border-glass-border/30">
      {/* Background */}
      <div className="absolute inset-0 bg-secondary/30 backdrop-blur-sm" />

      <div className="relative z-10">
        <div className="flex animate-ticker">
          {/* First set of metrics */}
          {[...metrics, ...metrics].map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-8 px-12 whitespace-nowrap"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <metric.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">{metric.label}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold">{metric.value}</span>
                    {metric.change && (
                      <span className="text-xs text-primary font-medium">{metric.change}</span>
                    )}
                    {metric.status === "live" && (
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-xs text-primary font-medium">Live</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-px h-12 bg-glass-border/30" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
