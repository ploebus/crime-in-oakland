function naturalEarth(λ, φ) {
  var φ2 = φ * φ, φ4 = φ2 * φ2;
  return [
    λ * (.8707 - .131979 * φ2 + φ4 * (-.013791 + φ4 * (.003971 * φ2 - .001529 * φ4))),
    φ * (1.007226 + φ2 * (.015085 + φ4 * (-.044475 + .028874 * φ2 - .005916 * φ4)))
  ];
}

naturalEarth.invert = function(x, y) {
  var φ = y, i = 25, δ;
  do {
    var φ2 = φ * φ, φ4 = φ2 * φ2;
    φ -= δ = (φ * (1.007226 + φ2 * (.015085 + φ4 * (-.044475 + .028874 * φ2 - .005916 * φ4))) - y) /
        (1.007226 + φ2 * (.015085 * 3 + φ4 * (-.044475 * 7 + .028874 * 9 * φ2 - .005916 * 11 * φ4)));
  } while (Math.abs(δ) > ε && --i > 0);
  return [
    x / (.8707 + (φ2 = φ * φ) * (-.131979 + φ2 * (-.013791 + φ2 * φ2 * φ2 * (.003971 - .001529 * φ2)))),
    φ
  ];
};

(d3.geo.naturalEarth = function() { return projection(naturalEarth); }).raw = naturalEarth;
