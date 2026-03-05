import { motion, useScroll, useTransform, useInView, useMotionValue, useMotionTemplate, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import naturalImg from "../assets/images/About/natural-ingredients.jpg";
import heroImg from "../assets/images/About/vedique-hero.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.08,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const values = [
  { number: "5000+", label: "years of wisdom" },
  { number: "100%", label: "natural ingredients" },
  { number: "0", label: "bs fillers" },
  { number: "∞", label: "generations tested" },
];

const principles = [
  {
    title: "ancient roots",
    desc: "every recipe traces back centuries. no trends, no fads — just time-tested knowledge passed down through generations.",
    extra: "Our grandmothers whispered these secrets while the rest of the world chased pills.",
  },
  {
    title: "radical simplicity",
    desc: "if your great-grandma wouldn't recognize it, we don't use it. real ingredients, nothing synthetic, nothing unnecessary.",
    extra: "One jar. One purpose. Zero confusion.",
  },
  {
    title: "zero gatekeeping",
    desc: "wellness shouldn't need a PhD to understand. we translate ancient wisdom into something you can actually use today.",
    extra: "Tap any card to feel the wisdom unfold.",
  },
];

const tags = ["100% natural", "no bs fillers", "centuries-tested", "small batch", "grandma approved"];

const TiltCard = ({ children }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-150, 150], [25, -25]);
  const rotateY = useTransform(x, [-150, 150], [-25, 25]);
  const shadow = useMotionTemplate`0 25px 50px -12px rgb(0 0 0 / 0.25)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.4);
    y.set((e.clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        boxShadow: shadow,
      }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="relative h-full rounded-3xl overflow-hidden border border-border/50 bg-card p-8 group cursor-pointer"
    >
      {children}
    </motion.div>
  );
};

const AnimatedCounter = ({ endValue }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const raw = String(endValue).trim();
    if (raw === "∞" || raw === "0") {
      setCount(raw);
      return;
    }

    const num = parseFloat(raw.replace(/[^0-9.]/g, "")) || 0;
    if (num === 0) {
      setCount(raw);
      return;
    }

    let start = 0;
    const duration = 1800;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      const current = Math.floor(num * easeProgress);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(num);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, endValue]);

  const display = typeof count === "number" && endValue.includes("+")
    ? `${count}+`
    : count;

  return <span ref={ref} className="font-heading text-5xl md:text-6xl font-light tabular-nums">{display}</span>;
};

const AboutPage = () => {
  const parallaxRef = useRef(null);
  const { scrollYProgress: globalScroll } = useScroll();
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-body">
      {/* Wisdom Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-primary via-primary/70 to-transparent z-[60]"
        style={{ scaleX: globalScroll, transformOrigin: "left" }}
      />


      {/* Hero Section */}
      <section className="relative min-h-[70vh] md:min-h-screen flex items-center justify-center px-6 pt-40 md:pt-48 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(#e5e5e5_0.8px,transparent_1px)] bg-[length:4px_4px] opacity-30"
          style={{ y: useTransform(globalScroll, [0, 1], ["0%", "-20%"]) }}
        />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.p
              variants={fadeUp}
              custom={0}
              className="mb-6 text-xs tracking-[0.35em] uppercase font-medium text-primary"
            >
              the story behind the jar
            </motion.p>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-4xl md:text-7xl lg:text-[5.5rem] leading-[1.1] font-light font-heading tracking-[-0.03em]"
            >
              got tired of wellness<br className="hidden md:block" />
              {" "}being <motion.span
                className="italic text-primary relative inline-block"
                whileHover={{ scale: 1.05, rotate: -1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >complicated.</motion.span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-8 max-w-md mx-auto text-lg text-muted-foreground font-light"
            >
              ancient recipes. zero fluff. just the good stuff — sourced, tested, and made with intention.
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs tracking-widest text-muted-foreground"
        >
          scroll for wisdom
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="w-px h-8 bg-gradient-to-b from-transparent via-primary to-transparent"
          />
        </motion.div>
      </section>

      {/* Values Counter - Ultra smooth */}
      <section className="px-6 py-20 md:py-28 border-y border-border bg-card">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16"
          >
            {values.map((v, i) => (
              <motion.div
                key={v.label}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -12, transition: { type: "spring", stiffness: 300 } }}
                className="group text-center relative"
              >
                <div className="relative inline-block">
                  <AnimatedCounter endValue={v.number} />
                  <motion.div
                    className="absolute -inset-6 bg-primary/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-700"
                  />
                </div>
                <div className="mt-4 text-xs tracking-[0.3em] uppercase text-muted-foreground group-hover:text-primary transition-colors">
                  {v.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Story + Parallax Image */}
      <section ref={parallaxRef} className="px-6 py-20 md:py-32">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-16 md:items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="flex-1 space-y-10"
            >
              <motion.h2
                variants={fadeUp}
                custom={0}
                className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] font-heading"
              >
                your great-grandma<br />
                had it figured out.<br />
                <span className="text-primary italic">we just wrote it down.</span>
              </motion.h2>

              <div className="space-y-6 text-[15px] md:text-base text-muted-foreground font-light leading-relaxed">
                {[
                  "no lab coats. no jargon. just stuff that's worked for centuries.",
                  "we dug through generations of knowledge so you don’t have to.",
                  "Vedique is what happens when ancient wisdom stops gatekeeping.",
                ].map((text, i) => (
                  <motion.p key={i} variants={fadeUp} custom={i + 1}>
                    {text}
                  </motion.p>
                ))}
              </div>

              <motion.div variants={fadeUp} custom={4} className="flex flex-wrap gap-3">
                {tags.map((tag, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.1, backgroundColor: "#f3e8d8" }}
                    className="px-6 py-3 text-xs tracking-widest border border-primary/30 text-primary rounded-2xl transition-colors"
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            {/* Parallax Image Container */}
            <div className="flex-1 relative h-[520px] md:h-[620px] rounded-3xl overflow-hidden shadow-2xl">
              <motion.img
                style={{ y: imageY }}
                src={naturalImg}
                alt="Natural ingredients"
                className="absolute inset-0 w-full h-full object-cover scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 text-white text-sm max-w-[240px]">
                every leaf, every seed — hand-picked with the same care as 5000 years ago
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principles - 3D Tilt Cards (insanely interactive on laptop) */}
      <section className="px-6 py-20 md:py-32 bg-card">
        <div className="max-w-5xl mx-auto">
          <p className="uppercase text-primary text-xs tracking-[0.4em] font-medium mb-10">what we believe in</p>

          <div className="grid md:grid-cols-3 gap-8">
            {principles.map((p, i) => (
              <TiltCard key={i}>
                <span className="font-heading text-[9rem] font-light text-border/70 block -mt-6 -ml-3 select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3 className="font-heading text-3xl font-light mb-4 tracking-tight">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{p.desc}</p>

                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  whileHover={{ opacity: 1, height: "auto" }}
                  className="overflow-hidden text-xs text-primary/80 font-light border-t border-border/30 pt-5"
                >
                  {p.extra}
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Dramatic Parallax Footer */}
      <section className="relative h-[520px] md:h-[620px] flex items-center justify-center overflow-hidden">
        <motion.img
          src={heroImg}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ scale: useTransform(globalScroll, [0.7, 1], [1, 1.15]) }}
        />
        <div className="absolute inset-0 bg-black/60" />

        <motion.p
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.215, 0.61, 0.355, 1] }}
          className="relative z-10 max-w-2xl px-8 text-center text-white font-heading text-4xl md:text-6xl leading-none tracking-[-0.02em]"
        >
          nature already had the answers.<br />
          <span className="text-primary/90 text-3xl md:text-5xl">we just put them in a jar.</span>
        </motion.p>
      </section>
    </div>
  );
};

export default AboutPage;