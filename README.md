# SimplifiedMotion
Shows ("realistic") motion of air parcels based on interactive pressure map.

[Click here to go to the simulation](https://hartery5.github.io/SimplifiedMotion/)

# Background
At a given height above sea level, horizontal motion in the atmosphere (``wind") is created from pressure gradients. This simulation allows you the freedom to create zones of high and low pressure by clicking with your mouse. Each click adds (or subtracts) a unit 2D gaussian to the background pressure field, deforming the pressure field and producing pressure gradients.

The motion of the small dots, or ``tracers", follow the motion of air according to the simplified equations of motion in height coordinates, i.e. in scalar component form the zonal and meridional accelerations are:

$$ \frac{d u}{d t} = f v - \frac{1}{\rho} \frac{\partial p}{\partial x} $$

$$ \frac{d v}{d t} = -f u - \frac{1}{\rho} \frac{\partial p}{\partial y} $$

Note the following limitations:
a) the above equations already make several simplifications to the primitive equations (e.g. ignoring friction, the vertical component of the coriolis force, ignoring curvature terms, etc.)
b) for speed, integration is done using a (very) simple Euler scheme, and
b) parcels are initially assumed to be in geostrophic balance. So the resulting simulation of motion is neither very precise, nor accurate. However, it should still qualitatively guide your intuition.

# What Should I Do With This?
The horizontal velocity field can be described by 4 independent parameters: vorticity, divergence, stretching, and shearing. It would be useful to check
