// import type { VolumeControlProps, VolumeMenuProps } from '@/types/';
// import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
// import { VolumeHigh, VolumeSlash } from '../../UI/Icons';
// import Button from '../../UI/Button.tsx';
// import './volumemenu.css';

// const renderVolumeControl = ({
//   label,
//   states,
//   controlFns,
// }: VolumeControlProps) => (
//   <MenuItem>
//     <div className="flex flex-col gap-1 w-full py-1.5 px-3">
//       <span>{label}</span>
//       <div className="flex gap-2 justify-between items-center">
//         <Button
//           variant="secondary"
//           className="!shadow-none !p-2 !text-lg"
//           onClick={controlFns.setMuted}
//         >
//           {states.muted ? (
//             <VolumeSlash width={16} height={16} />
//           ) : (
//             <VolumeHigh width={16} height={16} />
//           )}
//         </Button>
//         <input
//           className="volumen-range"
//           type="range"
//           min="0"
//           max="1"
//           step="0.1"
//           value={states.volume}
//           onChange={(e) => controlFns.setVolume(parseFloat(e.target.value))}
//           style={{
//             background: `linear-gradient(to right, #E54056 ${
//               states.volume * 100
//             }%, #e7e5e4 ${states.volume * 100}%)`,
//           }}
//         />
//         <span className="w-6 text-center">
//           {Math.round(states.volume * 100)}
//         </span>
//       </div>
//     </div>
//   </MenuItem>
// );

// export default function VolumeMenu({
//   nStates,
//   aStates,
//   controls,
// }: VolumeMenuProps) {
//   return (
//     <div>
//       <Menu>
//         <MenuButton className="p-3 rounded-xl flex items-center justify-center space-x-2 bg-[#FAF7F4] text-[#72564B] hover:bg-[#efebe9] shadow-secondaryButton active:scale-95">
//           <VolumeHigh />
//         </MenuButton>
//         <MenuItems
//           transition
//           anchor="bottom end"
//           className="w-52 mt-2 origin-top-right rounded-xl border bg-[#FAF7F4] p-1 text-sm/6 text-[#72564B] transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
//         >
//           {renderVolumeControl({
//             label: 'Narrador',
//             states: nStates,
//             controlFns: controls,
//           })}
//           {renderVolumeControl({
//             label: 'Ambiente',
//             states: aStates,
//             controlFns: controls.ambient,
//           })}
//         </MenuItems>
//       </Menu>
//     </div>
//   );
// }
