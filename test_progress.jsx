export const ProgressBar = () => {
  return (
    <div className="w-full max-w-3xl mx-auto mb-10 relative" dir="rtl">
      {/* Dashed Line */}
      <div className="absolute top-1/2 left-0 right-0 h-[2px] border-t-2 border-dashed border-slate-200 -z-10 -translate-y-1/2"></div>
      
      <div className="flex justify-between items-center">
        {/* Step 1 */}
        <div className="relative flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-[#52B5E8] text-white flex items-center justify-center shadow-sm relative z-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          </div>
          <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-white border-2 border-[#52B5E8] flex items-center justify-center text-[#52B5E8] text-xs font-bold z-20">1</div>
        </div>

        {/* Step 2 */}
        <div className="relative flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-[#52B5E8] text-white flex items-center justify-center shadow-sm relative z-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          </div>
          <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-white border-2 border-[#52B5E8] flex items-center justify-center text-[#52B5E8] text-xs font-bold z-20">2</div>
        </div>

        {/* Step 3 */}
        <div className="relative flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-[#1B84C4] text-white flex items-center justify-center shadow-sm relative z-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 6.5h11"></path><path d="M6.5 17.5h11"></path><path d="m3.5 8.5 3-3"></path><path d="m17.5 5.5 3 3"></path><path d="m3.5 15.5 3 3"></path><path d="m17.5 18.5 3-3"></path><path d="m9 12 6-6"></path><path d="m15 12-6 6"></path></svg>
          </div>
          <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-white border-2 border-[#1B84C4] flex items-center justify-center text-[#1B84C4] text-xs font-bold z-20">3</div>
        </div>
      </div>
    </div>
  )
}
