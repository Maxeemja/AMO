import {NavLink} from "react-router-dom";

export const LabLink = ({ children, to, className, ...props }) => {

  return (
    <div>
      <NavLink
        to={to}
        className={({isActive}) => 'hover:bg-gray-200 rounded py-2 px-4 font-semibold tracking-wide' + (isActive ? ' bg-violet-200' : '')}
        {...props}
      >
        {children}
      </NavLink>
    </div>
  );
}