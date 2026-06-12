# SimplifiedMotion
Displays the horizontal motion of air parcels based on interactive pressure map.

[Click here to go to the simulation!](https://hartery5.github.io/SimplifiedMotion/)

# Basic Instructions
At a given height above sea level, horizontal motion in the atmosphere ("wind") is created from pressure gradients. This simulation lets you create zones of high and low pressure by clicking with your mouse. Each click adds (or subtracts) a unit 2D gaussian to the background pressure field, creating the familiar lows (L) and highs (H) we see on synoptic charts. The resulting pressure gradient field produces motion, which is further influenced by the Coriolis force[^1]. You can use the "Reset Everything" button to reset the pressure field and re-initialize the trajectories. "Reset Tracers" will leave the pressure field as-is, but it will re-initialize the trajectories.

# Equations of Motion
The small dots, or "tracers", follow the motion of air according to the simplified equations of motion in height coordinates. In scalar component form, the inviscid zonal and meridional accelerations are:

$$ \frac{d u}{d t} = f v - \frac{1}{\rho} \frac{\partial p}{\partial x} $$
$$ \frac{d v}{d t} = -f u - \frac{1}{\rho} \frac{\partial p}{\partial y} $$

where $u$ and $v$ are the zonal and meridional velocities, $\rho$ is the density of the air parcel, $f$ is the Coriolis parameter[^2], and $p$ is pressure (Martin, 2013, pp. 63). To help visualize the influence of viscous friction, these equations are modified to add a simple Stokesian friction:

$$ \frac{d u}{d t} = f v - \frac{1}{\rho} \frac{\partial p}{\partial x} - \mu u$$
$$ \frac{d v}{d t} = -f u - \frac{1}{\rho} \frac{\partial p}{\partial y} - \mu v $$

where $\mu$ is a friction coefficient.

Note the following limitations:
1. the above equations already make several simplifications to the primitive equations (*i.e.* we ignore the vertical component of the coriolis force, any curvature terms, vertical motion), and hence this is really only valid in the mid-latitude free troposphere.
2. for computation speed, integration is done using a (very) simple Euler scheme.
3. there is no "feedback" so the pressure field you create is static. In a real atmosphere, convergence (and divergence) of air parcels influences the pressure (*e.g.* continued horizontal convergence in a low pressure system without any vertical motion will gradually raise the pressure). Mass continuity is violated.
4. The model of friction not very accurate. In the primitive equations, one usually models friction as:
   $$ \nu \nabla^2\vec{V} $$
   This would require taking spatial derivatives of the velocity field, but the velocity field is not solved for explicitly.
6. parcels are initially assumed to be in geostrophic balance (Martin, 2013, pp. 61-62):

$$ u_0 = -\frac{1}{\rho f} \frac{\partial p}{\partial y} $$
$$ v_0 = \frac{1}{\rho f} \frac{\partial p}{\partial x} $$

The resulting simulation of motion is neither very precise, nor very accurate. So what is the purpose? The simulation is meant to be a playground for determining 1) how different arrangements of highs and lows can create vorticity, divergence, and deformation and 2) how the friction and coriolis forces influence these attributes of the horizontal flow. In this regard, physical accuracy and precision is not needed and would only lead to a much slower, less interactive simulation. See the following section for suggested "experiments".

# What Should I Do With This?
The horizontal velocity field can be described by 4 independent parameters: vorticity $\zeta$, divergence $D$, stretching deformation $F_1$, and shearing deformation $F_2$ (Martin, 2013, pp. 16-20). When first loaded, the simulation shows parcels moving accorind to geostrophic flow.

Suggested Experiments:
1. Contemplate what type of circulation a high pressure system creates (cyclonic or anti-cyclonic). Repeat for a low pressure system.
2. What is the relationship between wind speed and pressure gradient? Note: you can click the same location multiple times[^3] to repeatedly deform the pressure field.
3. Can you create a deformation zone?
4. Switch the wind from "geostrophic" to "real" and repeat step 1. What other attribute of flow is associated with a high and a low: divergence, convergence, shear, stretching?
5. With your answer to 4 in mind, how does friction influence the magnitude of this attribute? As you toggle friction on and off, try resetting the tracers so that you get a clear answer.
6. For fun, turn off the Coriolis force (but keep friction on). This should give you a very clear answer to 4.

# References
Martin, Jonathan E. *Mid-Latitude Atmospheric Dynamics: A First Course.* John Wiley & Sons, 2013.

# Programming Tasks
Not much left to add functionally speaking - but it probably needs some visual TLC (coordinate arrows, a grid?). I also considered having particles "streak" like on Windy, but it might be too memory intensive. I think Windy does this with "shaders" which I am not too keen on getting into. Another idea is to have a separate mode where the user can drop in a larger tracer which shows vectors representing the PGA and CA (and possibly friction!). Otherwise, there is a lot bad variable management that could be improved, but I can't be arsed.

[^1]: An apparent force which does no work.
[^2]: For this simulation, $f>0$, *i.e.* the Northern Hemisphere. 
[^3]: Don't click too many times - the contour line drawing is very inefficient and the program will seize up.
