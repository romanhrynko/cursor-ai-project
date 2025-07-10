interface PlanCardProps {
  plan: string;
  usage: number;
  limit: number;
  visible: boolean;
}

export function PlanCard({ plan, usage, limit, visible }: PlanCardProps) {
  return (
    <div className={`rounded-2xl shadow-lg mb-8 p-6 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 relative overflow-hidden transform transition-all duration-700 ${visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="uppercase text-xs font-bold text-white/80 mb-1">Current Plan</div>
          <div className="text-2xl font-bold text-white mb-2">{plan}</div>
          <div className="flex items-center gap-2 text-white/80 text-sm">
            API Limit
            <span className="relative group cursor-pointer">
              <span className="ml-1 text-white/60">&#9432;</span>
              <span className="absolute left-1/2 -translate-x-1/2 mt-2 w-40 bg-black text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">API requests allowed per month</span>
            </span>
          </div>
          <div className="mt-2 w-full max-w-xs">
            <div className="h-2 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-2 bg-white rounded-full transition-all duration-700"
                style={{ width: visible ? `${(usage / limit) * 100}%` : '0%' }}
              />
            </div>
            <div className="text-xs text-white/80 mt-1">{usage} / {limit} Requests</div>
          </div>
        </div>
        <button className="self-start sm:self-auto mt-2 sm:mt-0 px-4 py-2 rounded-lg bg-white/20 text-white font-semibold shadow hover:bg-white/30 transition cursor-pointer">
          Manage Plan
        </button>
      </div>
    </div>
  );
} 