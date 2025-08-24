export function Logo({ src="", label="", link="", invert=false }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center"
    >
      <img
        src={src}
        className={`ease-in-out ${invert ? "invert dark:invert-0" : "invert-0 dark:invert"} w-full h-auto object-contain hover:scale-120 transition cursor-pointer group-hover:translate-y-[-10px]`}
      />
      
      <span className={`ease-in-out ${invert ? "text-secondary" : "text-primary"} font-semibold max-h-0 group-hover:max-h-10 opacity-0 group-hover:opacity-100 transition-all duration-300 text-sm`}>
        {label}
      </span>
    </a>
  );
}

export function CSharpLogo({invert=false}) {
  return <Logo
  invert={invert}
  src="/logos/csharp.svg"
  label="C#"
  link="https://learn.microsoft.com/en-us/dotnet/csharp/"
/>
}

export function PythonLogo({invert=false}) {
  return <Logo
  invert={invert}
  src="/logos/python.svg"
  label="Python"
  link="https://www.python.org/"
/>
}

export function JavaScriptLogo({invert=false}) {
  return <Logo
  invert={invert}
  src="/logos/js.svg"
  label="JavaScript"
  link="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
/>
}

export function ReactLogo({invert=false}) {
  return <Logo
  invert={invert}
  src="/logos/react.svg"
  label="React"
  link="https://react.dev/"
/>
}

export function GitLogo({invert=false}) {
  return <Logo
  invert={invert}
  src="/logos/git.svg"
  label="Git"
  link="https://git-scm.com/"
/>
}

export function UnityLogo({invert=false}) {
  return <Logo
  invert={invert}
  src="/logos/unity.svg"
  label="Unity"
  link="https://unity.com/"
/>
}

export function GodotLogo({invert=false}) {
  return <Logo
  invert={invert}
  src="/logos/godot.svg"
  label="Godot"
  link="https://godotengine.org/"
/>
}




